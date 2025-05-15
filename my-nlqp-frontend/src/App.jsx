import React, { useState } from 'react';

const QueryInput = () => {
  const [query, setQuery] = useState('');
  const [sql, setSql] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');
    try {
      const response = await fetch('http://localhost:5000/nlqp', {  // match your backend port
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      setSql(data.sql);
    } catch (err) {
      setError('Failed to fetch SQL: ' + err.message);
      setSql('');
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2 style={{ textAlign: 'center' }}>Natural Language to SQL</h2>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="e.g., age greater than 30"
        style={{ width: '100%', padding: 8, marginBottom: 10 }}
      />

      <button onClick={handleSubmit} style={{ padding: '8px 16px' }}>
        Convert
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {sql && (
        <div style={{ marginTop: 20 }}>
          <h3>Generated SQL:</h3>
          <pre style={{ background: '#eee', padding: 10 }}>{sql}</pre>
        </div>
      )}
    </div>
  );
};

export default QueryInput;
