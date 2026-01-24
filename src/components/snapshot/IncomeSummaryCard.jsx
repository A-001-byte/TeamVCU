
import React from 'react';

const IncomeSummaryCard = ({ totalIncome, primarySources }) => {
  return (
    <div className="summary-card">
      <h3>Income Summary</h3>
      <h2>{totalIncome}</h2>
      <div>
        <h4>Primary Sources:</h4>
        <ul>
          {primarySources.map((source, index) => (
            <li key={index}>{source}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default IncomeSummaryCard;
