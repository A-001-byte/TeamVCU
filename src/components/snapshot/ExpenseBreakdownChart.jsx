import React from 'react';

const ExpenseBreakdownChart = ({ categories }) => {
  return (
    <div className="summary-card">
      <h3>Expense Breakdown</h3>
      {/* You can use a library like Chart.js or Recharts to create a chart here */}
      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            {category.category}: {category.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseBreakdownChart;
