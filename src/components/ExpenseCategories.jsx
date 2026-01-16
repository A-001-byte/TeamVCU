/**
 * ExpenseCategories Component - Categories with biggest expenses
 */

import { EXPENSE_CATEGORIES } from '../data/mockData';
import { formatCurrency } from '../utils/formatters';

function ExpenseCategories() {
  return (
    <div className="expense-categories-section">
      <h3 className="section-title">Categories with Biggest Expense</h3>
      <div className="categories-grid">
        {EXPENSE_CATEGORIES.map((category, index) => (
          <div key={index} className="category-card">
            <div className="category-icon" style={{ backgroundColor: `${category.color}20` }}>
              <span style={{ fontSize: '24px' }}>{category.icon}</span>
            </div>
            <div className="category-info">
              <div className="category-name">{category.name}</div>
              <div className="category-amount" style={{ color: category.color }}>
                {formatCurrency(category.amount)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExpenseCategories;

