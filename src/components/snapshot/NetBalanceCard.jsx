import React from 'react';

const NetBalanceCard = ({ income, expense }) => {
  const netBalance = income - expense;

  return (
    <div className="summary-card">
      <h3>Net Balance</h3>
      <h2>{netBalance}</h2>
    </div>
  );
};

export default NetBalanceCard;
