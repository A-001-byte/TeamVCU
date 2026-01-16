import React from 'react';

const EmiSummaryCard = ({ totalEmi, obligations }) => {
  return (
    <div className="summary-card">
      <h3>EMI Summary</h3>
      <h2>{totalEmi}</h2>
      <div>
        <h4>Obligations:</h4>
        <ul>
          {obligations.map((obligation, index) => (
            <li key={index}>
              {obligation.name}: {obligation.amount}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EmiSummaryCard;
