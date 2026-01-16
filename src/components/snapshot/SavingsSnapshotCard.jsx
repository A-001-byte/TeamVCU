import React from 'react';

const SavingsSnapshotCard = ({ savingsAmount, savingsRate }) => {
  return (
    <div className="summary-card">
      <h3>Savings Snapshot</h3>
      <h2>{savingsAmount}</h2>
      <p>Savings Rate: {savingsRate}%</p>
    </div>
  );
};

export default SavingsSnapshotCard;
