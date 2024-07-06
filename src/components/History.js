import React from 'react';
import '../assets/main.css';

const History = ({ history, onHistoryItemClick }) => {
  return (
    <aside className="w-1/4 bg-gray-200 p-4">
      <h2 className="mb-4">History</h2>
      <ul>
        {history.map((item, index) => (
          <li key={index}>
            <button className="history-item" onClick={() => onHistoryItemClick(item)}>
              {item}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default History;
