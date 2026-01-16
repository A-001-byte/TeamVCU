/**
 * BurnRateDetail Component - Detailed view of burn rate analysis
 */

import PropTypes from 'prop-types';
import { AlertCircle, TrendingUp, Info } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

/**
 * BurnRateDetail component
 * @param {Object} props - Component props
 * @param {Object} props.burnRate - Burn rate data object
 * @param {number} props.monthlyExpense - Monthly expense amount
 * @param {number} props.savings - Current savings amount
 */
function BurnRateDetail({ burnRate, monthlyExpense, savings }) {
  if (!burnRate) {
    return (
      <div className="burn-rate-detail">
        <h3 className="section-title">Burn Rate Analysis</h3>
        <p>No burn rate data available</p>
      </div>
    );
  }

  const warningClass = burnRate.warning?.toLowerCase() || 'safe';
  const warningConfig = {
    safe: { 
      bg: 'var(--accent-success-light)', 
      color: 'var(--accent-success)',
      icon: TrendingUp,
      message: 'Your savings can sustain current spending levels'
    },
    caution: { 
      bg: '#fef3c7', 
      color: '#d97706',
      icon: AlertCircle,
      message: 'Monitor your spending closely - runway is getting shorter'
    },
    critical: { 
      bg: 'var(--accent-danger-light)', 
      color: 'var(--accent-danger)',
      icon: AlertCircle,
      message: 'Immediate action required - savings will deplete soon'
    }
  };

  const config = warningConfig[warningClass] || warningConfig.safe;
  const WarningIcon = config.icon;

  return (
    <div className="burn-rate-detail">
      <div className="burn-rate-header">
        <div>
          <h2 className="chart-title">Burn Rate Analysis</h2>
          <p className="chart-subtitle">Time until savings depletion at current spending rate</p>
        </div>
        <div 
          className="burn-rate-warning"
          style={{
            background: config.bg,
            color: config.color
          }}
        >
          <WarningIcon size={18} />
          {burnRate.warning || 'Safe'}
        </div>
      </div>

      <div className="burn-rate-main">
        <div className="burn-rate-card">
          <div className="burn-rate-label">Months Remaining</div>
          <div className="burn-rate-value">{burnRate.monthsLeft?.toFixed(1) || '0'}</div>
          <div className="burn-rate-label" style={{ marginTop: '0.5rem', fontSize: '0.75rem' }}>
            At current monthly expense rate
          </div>
        </div>

        <div className="burn-rate-card">
          <div className="burn-rate-label">Monthly Expense</div>
          <div className="burn-rate-value" style={{ fontSize: '2rem' }}>
            {formatCurrency(monthlyExpense || 0)}
          </div>
          <div className="burn-rate-label" style={{ marginTop: '0.5rem', fontSize: '0.75rem' }}>
            Current average spending
          </div>
        </div>
      </div>

      <div className="burn-rate-insights">
        <div className="burn-rate-insight-title">Key Insights</div>
        
        <div className="burn-rate-insight-item">
          <div className="burn-rate-insight-icon info">
            <Info size={16} />
          </div>
          <div className="burn-rate-insight-text">
            <strong>Runway Status:</strong> {config.message}
          </div>
        </div>

        <div className="burn-rate-insight-item">
          <div className="burn-rate-insight-icon info">
            <Info size={16} />
          </div>
          <div className="burn-rate-insight-text">
            <strong>Current Savings:</strong> {formatCurrency(savings || 0)}
          </div>
        </div>

        <div className="burn-rate-insight-item">
          <div className="burn-rate-insight-icon info">
            <Info size={16} />
          </div>
          <div className="burn-rate-insight-text">
            <strong>Monthly Burn:</strong> {formatCurrency(monthlyExpense || 0)} per month
          </div>
        </div>

        {burnRate.warning === 'Critical' && (
          <div className="burn-rate-insight-item" style={{ background: 'var(--accent-danger-light)' }}>
            <div className="burn-rate-insight-icon" style={{ background: 'var(--accent-danger)', color: 'white' }}>
              <AlertCircle size={16} />
            </div>
            <div className="burn-rate-insight-text" style={{ color: 'var(--accent-danger)' }}>
              <strong>Action Required:</strong> Consider reducing expenses or increasing income immediately. 
              You have less than 3 months of runway remaining.
            </div>
          </div>
        )}

        {burnRate.warning === 'Caution' && (
          <div className="burn-rate-insight-item" style={{ background: '#fef3c7' }}>
            <div className="burn-rate-insight-icon" style={{ background: '#d97706', color: 'white' }}>
              <AlertCircle size={16} />
            </div>
            <div className="burn-rate-insight-text" style={{ color: '#d97706' }}>
              <strong>Recommendation:</strong> Review your spending patterns. You have 3-6 months of runway. 
              Consider creating a budget to extend your financial runway.
            </div>
          </div>
        )}

        {burnRate.warning === 'Safe' && (
          <div className="burn-rate-insight-item" style={{ background: 'var(--accent-success-light)' }}>
            <div className="burn-rate-insight-icon" style={{ background: 'var(--accent-success)', color: 'white' }}>
              <TrendingUp size={16} />
            </div>
            <div className="burn-rate-insight-text" style={{ color: 'var(--accent-success)' }}>
              <strong>Good News:</strong> Your financial runway is healthy with more than 6 months remaining. 
              Continue monitoring your spending to maintain this status.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

BurnRateDetail.propTypes = {
  burnRate: PropTypes.shape({
    monthsLeft: PropTypes.number,
    warning: PropTypes.oneOf(['Safe', 'Caution', 'Critical']),
  }),
  monthlyExpense: PropTypes.number,
  savings: PropTypes.number,
};

export default BurnRateDetail;
