import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { Users, CreditCard, Calendar, Printer, Database } from 'lucide-react';

function App() {
  const [view, setView] = useState('pagamenti');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ nome: '', corso: 'Danza', importo: '' });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    const { data: records, error } = await supabase
      .from('pagamenti')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setData(records);
    setLoading(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { error } = await supabase
      .from('pagamenti')
      .insert([{
        nome: form.nome,
        corso: form.corso,
        importo: parseFloat(form.importo),
        data: new Date().toLocaleDateString('it-IT')
      }]);
    if (!error) {
      setForm({ nome: '', corso: 'Danza', importo: '' });
      fetchData();
    }
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f4f7f6' }}>
      <div style={{ width: '260px', background: '#1a1a1a', color: 'white', padding: '20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ width: '60px', height: '60px', background: '#d4af37', borderRadius: '50%', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'black', fontWeight: 'bold' }}>
            AJ
          </div>
          <div style={{ color: '#d4af37', fontSize: '1.2rem', marginTop: '10px' }}>
            AJ FUSION ACADEMY
          </div>
        </div>
        <div onClick={() => setView('pagamenti')} style={{ padding: '15px', cursor: 'pointer', borderBottom: '1px solid #333' }}>
          💰 Pagamenti
        </div>
        <div onClick={() => setView('iscritti')} style={{ padding: '15px', cursor: 'pointer', borderBottom: '1px solid #333' }}>
          👥 Anagrafica
        </div>
        <div onClick={() => setView('registro')} style={{ padding: '15px', cursor: 'pointer', borderBottom: '1px solid #333' }}>
          📅 Presenze
        </div>
        <div style={{ marginTop: 'auto', fontSize: '0.8rem', color: '#666', textAlign: 'center' }}>
          {loading ? "Sincronizzazione..." : "Cloud Online ●"}
        </div>
      </div>

      <div style={{ flex: 1, padding: '40px' }}>
        <div style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          {view === 'pagamenti' && (
            <>
              <h2>Registra Nuovo Pagamento</h2>
              <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px', marginBottom: '30px' }}>
                <input
                  placeholder="Nome Corsista"
                  value={form.nome}
                  onChange={e => setForm({...form, nome: e.target.value})}
                  style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ddd' }}
                  required
                />
                <select value={form.corso} onChange={e => setForm({...form, corso: e.target.value})} style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ddd' }}>
                  <option>Danza</option>
                  <option>Boxe</option>
                  <option>Yoga</option>
                  <option>Pilates</option>
                </select>
                <input
                  type="number"
                  placeholder="Importo €"
                  value={form.importo}
                  onChange={e => setForm({...form, importo: e.target.value})}
                  style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ddd' }}
                  required
                />
                <button type="submit" style={{ padding: '12px', background: '#1a1a1a', color: '#d4af37', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                  Salva nel Cloud
                </button>
              </form>
              <h3>Storico Movimenti</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #eee' }}>
                    <th style={{ textAlign: 'left', padding: '12px', color: '#666' }}>Data</th>
                    <th style={{ textAlign: 'left', padding: '12px', color: '#666' }}>Nome</th>
                    <th style={{ textAlign: 'left', padding: '12px', color: '#666' }}>Corso</th>
                    <th style={{ textAlign: 'left', padding: '12px', color: '#666' }}>Importo</th>
                  </tr>
                </thead>
                <tbody>
                  {data && data.map((item) => (
                    <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '12px' }}>{item.data}</td>
                      <td style={{ padding: '12px' }}>{item.nome}</td>
                      <td style={{ padding: '12px' }}>{item.corso}</td>
                      <td style={{ padding: '12px' }}>€{item.importo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
