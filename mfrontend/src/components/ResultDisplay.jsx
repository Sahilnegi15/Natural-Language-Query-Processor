import React from 'react';

const ResultDisplay = ({ sql, error }) => {
  if (!sql && !error) return null;

  return (
    <div className="result-display">
      {error && <p className="error-message">{error}</p>}

      {sql && (
        <div className="sql-output">
          <h3 className="sql-output-title">Generated SQL:</h3>
          <pre className="sql-code">{sql}</pre>
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;