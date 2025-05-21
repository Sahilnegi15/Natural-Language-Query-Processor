import React from 'react';

const databases = [
  { id: 1, name: 'EmployeeDB', lastEdit: '2025-05-20 14:30' },
  { id: 2, name: 'SalesDB', lastEdit: '2025-05-19 09:15' },
  { id: 3, name: 'InventoryDB', lastEdit: '2025-05-18 16:45' },
];

const DatabaseList = () => {
  return (
    <div className="database-list">
      <h2 className="section-title">Available Databases</h2>
      <div className="database-grid">
        {databases.map((db) => (
          <div key={db.id} className="database-card">
            <div>
              <h3 className="database-name">{db.name}</h3>
              <p className="database-meta">
                Last Edited: {db.lastEdit}
              </p>
            </div>
            <button className="action-button">Open</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DatabaseList;