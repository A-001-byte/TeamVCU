import React from 'react';

const ExpenseSummaryCard = ({ totalExpense, topCategories }) => {
  return (
    <div className="summary-card">
      <h3>Expense Summary</h3>
      <h2>{totalExpense}</h2>
      <div>
        <h4>Top Categories:</h4>
        <ul>
          {topCategories.map((category, index) => (
            <li key={index}>
              {category.name}: {category.amount}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExpenseSummaryCard;
