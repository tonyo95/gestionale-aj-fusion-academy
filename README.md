# Gestionale AJ Fusion Academy

Gestionale completo per AJ Fusion Academy - Gestione presenze, entrate/uscite, stampa ricevute e reporting con UI moderna.

## Versione 26 con integrazione Supabase

### Caratteristiche
- ✅ Gestione presenze
- ✅ Registrazione entrate/uscite
- ✅ Stampa ricevute
- ✅ Reporting avanzato
- ✅ UI moderna con Lucide React
- ✅ Integrazione Supabase per database in cloud

### Tecnologie Utilizzate
- React 18.2.0
- Lucide React (Icone)
- Supabase 2.39.0
- React DOM
- React Scripts

### Struttura Progetto
```
gestionale-aj-fusion-academy/
├── public/
├── src/
│   ├── App.js
│   ├── index.js
│   └── supabaseClient.js
├── package.json
├── .env.example
└── README.md
```

### Installazione

1. Clonare il repository
```bash
git clone https://github.com/tonyo95/gestionale-aj-fusion-academy.git
cd gestionale-aj-fusion-academy
```

2. Installare le dipendenze
```bash
npm install
```

3. Configurare le variabili di ambiente
```bash
cp .env.example .env.local
```

Successivamente, aggiungere le tue credenziali Supabase nel file `.env.local`:
```
REACT_APP_SUPABASE_URL=your_supabase_url_here
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

4. Avviare l'applicazione
```bash
npm start
```

### Build per Produzione
```bash
npm run build
```

### Deployment
Il progetto è configurato per il deployment su GitHub Pages. I deployment vengono gestiti automaticamente tramite GitHub Actions.

### Autore
tonyo95

### Licenza
MIT
