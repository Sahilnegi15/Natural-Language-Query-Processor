import React, { useState } from 'react';

const QueryInput = () => {
  const [query, setQuery] = useState('');
  const [sql, setSql] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!query.trim()) return;
    setError('');
    setSql('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.text(); // plain text from backend
      setSql(data);
    } catch (err) {
      setError('Failed to fetch SQL: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
     <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar */}
      <nav style={{
        backgroundColor: '#282c34',
        color: '#fff',
        padding: '15px 30px',
        fontSize: '18px',
        fontWeight: 'bold',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        Natural Language Query Processor
      </nav>
    <div style={{ display: 'flex', height: '100vh' }}>
   
     { /*Input Section*/} 
      <div style={{ flex: 1, padding: '40px', borderRight: '1px solid #ccc' }}>
        <h2>Natural Language Input</h2>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., show all from empolyee"
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
          disabled={loading}
        />
        <button
          onClick={handleSubmit}
          style={{ padding: '8px 16px' }}
          disabled={loading || !query.trim()}
        >
          {loading ? 'Converting...' : 'Convert'}
        </button>
        {error && <p style={{ color: 'red', marginTop: 10 }}>{error}</p>}
      </div>

     { /* Output Section*/ }
      <div style={{ flex: 1, padding: '40px', background: '#f9f9f9' }}>
        <h2>Generated SQL Output:</h2>
        {sql ? (
          <pre style={{ background: '#eee', padding: 20 }}>{sql}</pre>
        ) : (
          <p style={{ color: '#666' }}>Your SQL output will appear here.</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default QueryInput;
