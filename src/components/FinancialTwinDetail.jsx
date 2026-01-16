/**
 * FinancialTwinDetail Component - Detailed view of financial twin analysis
 */

import PropTypes from 'prop-types';
import { Shield, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

/**
 * FinancialTwinDetail component
 * @param {Object} props - Component props
 * @param {Object} props.financialTwin - Financial twin data object
 */
function FinancialTwinDetail({ financialTwin }) {
  if (!financialTwin) {
    return (
      <div className="financial-twin-detail">
        <h3 className="section-title">Financial Twin</h3>
        <p>No financial data available</p>
      </div>
    );
  }

  const riskClass = financialTwin.risk?.toLowerCase() || 'low';
  const riskColors = {
    low: { bg: 'var(--accent-success-light)', color: 'var(--accent-success)' },
    medium: { bg: '#fef3c7', color: '#d97706' },
    high: { bg: 'var(--accent-danger-light)', color: 'var(--accent-danger)' }
  };

  return (
    <div className="financial-twin-detail">
      <div className="chart-header">
        <div>
          <h2 className="chart-title">Financial Twin Analysis</h2>
          <p className="chart-subtitle">AI-powered financial health assessment</p>
        </div>
      </div>

      <div className="twin-metrics-grid">
        <div className="twin-metric-card">
          <div className="twin-metric-label">Monthly Expense</div>
          <div className="twin-metric-value">{formatCurrency(financialTwin.monthlyExpense || 0)}</div>
          <div className="twin-detail-value" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
            Average monthly spending
          </div>
        </div>

        <div className="twin-metric-card">
          <div className="twin-metric-label">Runway Months</div>
          <div className="twin-metric-value">
            {financialTwin.runwayMonths === Infinity ? '∞' : financialTwin.runwayMonths?.toFixed(1) || '0'}
          </div>
          <div className="twin-detail-value" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
            Months until savings deplete
          </div>
        </div>

        <div className="twin-metric-card">
          <div className="twin-metric-label">Financial Stability</div>
          <div className="twin-metric-value" style={{ fontSize: '1.5rem' }}>{financialTwin.risk || 'LOW'}</div>
          <div 
            className="twin-risk-badge" 
            style={{ 
              background: riskColors[riskClass]?.bg || riskColors.low.bg,
              color: riskColors[riskClass]?.color || riskColors.low.color
            }}
          >
            {financialTwin.risk === 'HIGH' && <AlertTriangle size={16} style={{ marginRight: '0.25rem' }} />}
            {financialTwin.risk === 'MEDIUM' && <TrendingDown size={16} style={{ marginRight: '0.25rem' }} />}
            {financialTwin.risk === 'LOW' && <Shield size={16} style={{ marginRight: '0.25rem' }} />}
            {financialTwin.risk || 'LOW'} Stability
          </div>
        </div>
      </div>

      <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--bg-primary)', borderRadius: 'var(--radius-xl)' }}>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)', lineHeight: '1.5', margin: 0 }}>
          At your current spending pattern, your savings are projected to last approximately{' '}
          {financialTwin.runwayMonths === Infinity 
            ? 'indefinitely' 
            : `${financialTwin.runwayMonths?.toFixed(1) || 0} months`}.
        </p>
      </div>

      <div className="twin-details-section">
        <div className="twin-details-title">Detailed Metrics</div>
        <div className="twin-details-list">
          <div className="twin-detail-item">
            <span className="twin-detail-label">Average Monthly Expense</span>
            <span className="twin-detail-value">{formatCurrency(financialTwin.monthlyExpense || 0)}</span>
          </div>
          <div className="twin-detail-item">
            <span className="twin-detail-label">Financial Runway</span>
            <span className="twin-detail-value">
              {financialTwin.runwayMonths === Infinity 
                ? 'Unlimited' 
                : `${financialTwin.runwayMonths?.toFixed(1) || 0} months`}
            </span>
          </div>
          <div className="twin-detail-item">
            <span className="twin-detail-label">Stability Level</span>
            <span 
              className="twin-detail-value"
              style={{ 
                color: riskColors[riskClass]?.color || riskColors.low.color,
                fontWeight: 700
              }}
            >
              {financialTwin.risk || 'LOW'}
            </span>
          </div>
          <div className="twin-detail-item">
            <span className="twin-detail-label">Assessment</span>
            <span className="twin-detail-value">
              {financialTwin.risk === 'HIGH' 
                ? 'Immediate action required'
                : financialTwin.risk === 'MEDIUM'
                ? 'Monitor closely'
                : 'Financial health is stable'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

FinancialTwinDetail.propTypes = {
  financialTwin: PropTypes.shape({
    monthlyExpense: PropTypes.number,
    runwayMonths: PropTypes.number,
    risk: PropTypes.oneOf(['LOW', 'MEDIUM', 'HIGH']),
  }),
};

export default FinancialTwinDetail;
