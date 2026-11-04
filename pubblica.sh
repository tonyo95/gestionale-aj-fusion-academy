#!/bin/bash
# 1) Prepara il "robot" del backup serale (se c'è già, salta)  2) Pubblica il gestionale
P=ajfusion-gestionale
N=$(gcloud projects describe $P --format='value(projectNumber)')
SA=backup-serale@$P.iam.gserviceaccount.com
R=tonyo95/ajfusion-gestionale
echo "== Robot del backup serale (progetto $N) =="
gcloud services enable iam.googleapis.com iamcredentials.googleapis.com sts.googleapis.com --project $P
gcloud iam service-accounts describe $SA --project $P >/dev/null 2>&1 || \
  gcloud iam service-accounts create backup-serale --display-name="Robot backup serale" --project $P
gcloud projects add-iam-policy-binding $P --member=serviceAccount:$SA --role=roles/datastore.user --condition=None -q >/dev/null && echo "Permesso database: OK"
gcloud iam workload-identity-pools describe github --location=global --project $P >/dev/null 2>&1 || \
  gcloud iam workload-identity-pools create github --location=global --display-name=GitHub --project $P
gcloud iam workload-identity-pools providers describe gestionale --location=global --workload-identity-pool=github --project $P >/dev/null 2>&1 || \
  gcloud iam workload-identity-pools providers create-oidc gestionale --location=global --workload-identity-pool=github \
    --issuer-uri=https://token.actions.githubusercontent.com \
    --attribute-mapping=google.subject=assertion.sub,attribute.repository=assertion.repository \
    --attribute-condition="assertion.repository=='$R'" --project $P
gcloud iam service-accounts add-iam-policy-binding $SA --role=roles/iam.workloadIdentityUser \
  --member=principalSet://iam.googleapis.com/projects/$N/locations/global/workloadIdentityPools/github/attribute.repository/$R \
  --project $P -q >/dev/null && echo "Collegamento GitHub: OK"
echo "== Pubblicazione del gestionale =="
cd "$(dirname "$0")" && git log --oneline -1
NODE_OPTIONS=--dns-result-order=ipv4first FIREBASE_HOSTING_UPLOAD_CONCURRENCY=4 \
  firebase deploy --only hosting,firestore --project $P --non-interactive
