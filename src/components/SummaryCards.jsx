/**
 * SummaryCards Component - Expenses, Revenues cards
 */

import { SUMMARY_DATA } from '../data/mockData';
import { formatCurrency } from '../utils/formatters';

function SummaryCards() {
  const { expenses, expenseRevenues, revenues } = SUMMARY_DATA;

  return (
    <div className="summary-cards">
      <div className="summary-card" style={{ borderLeft: `4px solid ${expenses.color}` }}>
        <div className="summary-icon" style={{ color: expenses.color }}>
          {expenses.icon}
        </div>
        <div className="summary-content">
          <div className="summary-amount" style={{ color: expenses.color }}>
            {formatCurrency(-expenses.amount)}
          </div>
          <div className="summary-label">{expenses.label}</div>
        </div>
      </div>

      <div className="summary-card" style={{ borderLeft: `4px solid ${expenseRevenues.color}` }}>
        <div className="summary-icon" style={{ color: expenseRevenues.color }}>
          {expenseRevenues.icon}
        </div>
        <div className="summary-content">
          <div className="summary-amount" style={{ color: expenseRevenues.color }}>
            {formatCurrency(expenseRevenues.amount)}
          </div>
          <div className="summary-label">{expenseRevenues.label}</div>
        </div>
      </div>

      <div className="summary-card" style={{ borderLeft: `4px solid ${revenues.color}` }}>
        <div className="summary-icon" style={{ color: revenues.color }}>
          {revenues.icon}
        </div>
        <div className="summary-content">
          <div className="summary-amount" style={{ color: revenues.color }}>
            {formatCurrency(revenues.amount)}
          </div>
          <div className="summary-label">{revenues.label}</div>
        </div>
      </div>
    </div>
  );
}

export default SummaryCards;

