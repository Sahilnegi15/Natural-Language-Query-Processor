// src/pages/QueryConverter.jsx
import React, { useState } from 'react';
import ResultDisplay from '../components/ResultDisplay.jsx';

const QueryConverter = () => {
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

      const data = await response.text();
      setSql(data);
    } catch (err) {
      setError('Failed to fetch SQL: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="query-converter">
      <h2 className="section-title">Natural Language to SQL</h2>

      <div className="input-group">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., age greater than 30"
          className="query-input"
          disabled={loading}
        />

        <button
          onClick={handleSubmit}
          className={`convert-button ${loading || !query.trim() ? 'disabled' : ''}`}
          disabled={loading || !query.trim()}
        >
          {loading ? 'Converting...' : 'Convert'}
        </button>
      </div>

      <ResultDisplay sql={sql} error={error} />
    </div>
  );
};

export default QueryConverter;