/**
 * FinancialAutopsy Component - Displays ranked list of high impact expenses
 */

import PropTypes from 'prop-types';
import { formatCurrency } from '../utils/formatters';

/**
 * FinancialAutopsy component
 * @param {Object} props - Component props
 * @param {Array<{rank: number, merchant: string, amount: number, date: string, reason: string}>} props.report - Array of autopsy items
 */
function FinancialAutopsy({ report }) {
  if (!report || report.length === 0) {
    return (
      <div className="financial-autopsy">
        <h3 className="section-title">Financial Autopsy</h3>
        <p>No expenses to analyze</p>
      </div>
    );
  }

  return (
    <div className="financial-autopsy">
      <div className="chart-header">
        <div>
          <h2 className="chart-title">Financial Autopsy</h2>
          <p className="chart-subtitle">Top 5 high-impact expenses affecting your finances</p>
        </div>
      </div>
      <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'var(--bg-primary)', borderRadius: 'var(--radius-xl)' }}>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)', lineHeight: '1.5', margin: 0, fontWeight: 500 }}>
          Reducing just the top 2 expenses could significantly improve your financial runway.
        </p>
      </div>
      <ul className="autopsy-list">
        {report.map((item) => (
          <li key={item.rank} className="autopsy-item">
            <div className="autopsy-rank">#{item.rank}</div>
            <div className="autopsy-content">
              <div className="autopsy-merchant">{item.merchant}</div>
              <div className="autopsy-date">{item.date}</div>
              <div className="autopsy-reason">High-impact expense — contributed significantly to monthly outflow</div>
            </div>
            <div className="autopsy-amount">{formatCurrency(Math.abs(item.amount))}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

FinancialAutopsy.propTypes = {
  report: PropTypes.arrayOf(
    PropTypes.shape({
      rank: PropTypes.number.isRequired,
      merchant: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      reason: PropTypes.string,
    })
  ),
};

export default FinancialAutopsy;
