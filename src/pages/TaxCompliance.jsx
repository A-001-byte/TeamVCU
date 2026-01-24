import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, TrendingUp, Bell, AlertTriangle, Loader, DollarSign } from 'lucide-react';
import { useTaxComplianceData } from '../hooks/useTaxComplianceData';

const TaxCompliance = () => {
  const { data, loading, error } = useTaxComplianceData();
  const { taxSavingSuggestions, deadlines, cibilScore } = data;

  // Function to calculate remaining days
  const calculateRemainingDays = (dateString) => {
    const deadlineDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    deadlineDate.setHours(0, 0, 0, 0);

    const diffTime = deadlineDate - today;
    if (diffTime < 0) {
      return { days: 'Past', value: -1 };
    }
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return { days: `${diffDays} day(s)`, value: diffDays };
  };

  const processedDeadlines = deadlines.map(d => {
    const remaining = calculateRemainingDays(d.date);
    return {
      ...d,
      remaining: remaining.days,
      remainingValue: remaining.value,
      formattedDate: new Date(d.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })
    };
  }).filter(d => d.remainingValue >= 0).sort((a, b) => a.remainingValue - b.remainingValue);

  if (loading) {
    return (
      <div className="page-container centered">
        <Loader className="animate-spin" size={48} />
        <p>Loading tax data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container centered">
        <AlertTriangle size={48} className="text-red-500" />
        <p className="error-message">{error}</p>
        <Link to="/dashboard" className="back-button">Back to Dashboard</Link>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <Link to="/dashboard" className="back-button">
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>
        <h1 className="page-title">Tax Compliance Hub</h1>
        <p className="page-subtitle">Complete tax management & filing assistance for AY 2024-25</p>
      </div>

      <div className="page-content">
        <div className="profile-content-grid">
          <div className="profile-main-card">
            {/* CIBIL Score Card */}
            <div className="profile-settings-card">
              <h2 className="profile-settings-title">Your CIBIL Credit Score</h2>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Current Score</p>
                  <div style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--accent-primary)' }}>
                    {cibilScore?.score || 'N/A'}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Rating</p>
                  <p style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                    {cibilScore?.rating || 'Not Available'}
                  </p>
                </div>
              </div>
              {cibilScore?.details && (
                <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                  <p style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                    Score Breakdown
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {cibilScore.details.map((detail, idx) => (
                      <li key={idx} style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                        • {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* ITR Preparation Tools */}
            <div className="profile-settings-card">
              <h2 className="profile-settings-title">ITR Preparation Tools</h2>
              <div className="profile-info-grid">
                <div className="profile-info-item">
                  <div className="profile-info-icon">
                    <FileText size={20} />
                  </div>
                  <div className="profile-info-content">
                    <span className="profile-info-label">Upload Form 16 & AIS</span>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', margin: '0.5rem 0' }}>
                      Upload your tax documents
                    </p>
                    <button className="profile-edit-btn" style={{ marginTop: '10px' }}>
                      Upload Documents
                    </button>
                  </div>
                </div>
                <div className="profile-info-item">
                  <div className="profile-info-icon">
                    <TrendingUp size={20} />
                  </div>
                  <div className="profile-info-content">
                    <span className="profile-info-label">Pre-fill & File ITR</span>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', margin: '0.5rem 0' }}>
                      Auto-fill based on documents
                    </p>
                    <button className="profile-edit-btn" style={{ marginTop: '10px' }}>
                      Start Filing
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Tax-Saving Guidelines */}
            <div className="profile-settings-card">
              <h2 className="profile-settings-title">Tax-Saving Guidelines (FY 2023-24)</h2>
              <div className="profile-settings-list">
                {taxSavingSuggestions.map((suggestion, index) => (
                  <div key={index} style={{ 
                    padding: '1rem', 
                    marginBottom: index < taxSavingSuggestions.length - 1 ? '0.75rem' : 0,
                    background: 'var(--bg-primary)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-light)'
                  }}>
                    <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.5rem' }}>
                      <DollarSign size={16} color="var(--accent-success)" style={{ flexShrink: 0, marginTop: '0.125rem' }} />
                      <p style={{ fontWeight: '600', color: 'var(--text-primary)', fontSize: '0.9375rem', margin: 0 }}>
                        {suggestion.title}
                      </p>
                    </div>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', margin: 0, paddingLeft: '1.75rem' }}>
                      {suggestion.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Expert Tax Assistance */}
            <div className="profile-settings-card">
              <h2 className="profile-settings-title">Expert Tax Assistance</h2>
              <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', marginBottom: '1rem', margin: 0 }}>
                Connect with qualified Chartered Accountants for personalized advice.
              </p>
              <Link to="/find-ca">
                <button className="profile-edit-btn" style={{ marginTop: '1rem' }}>
                  Find a CA
                </button>
              </Link>
            </div>
          </div>

          {/* Deadlines Column */}
          <div className="profile-settings-column">
            <div className="profile-settings-card">
              <h2 className="profile-settings-title">Important Deadlines (AY 2024-25)</h2>
              <ul className="profile-settings-list">
                {processedDeadlines.map((deadline, index) => (
                  <li key={index} className="profile-settings-item" style={{
                    background: deadline.remainingValue <= 7 ? 'var(--accent-danger-light)' : 'transparent',
                    padding: '1rem',
                    marginBottom: index < processedDeadlines.length - 1 ? '0.75rem' : 0,
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem'
                  }}>
                    <Bell size={18} color={deadline.remainingValue <= 7 ? 'var(--accent-danger)' : 'var(--accent-primary)'} style={{ flexShrink: 0, marginTop: '0.125rem' }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '0.9375rem', fontWeight: '600', color: 'var(--text-primary)', margin: 0, marginBottom: '0.25rem' }}>
                        {deadline.title}
                      </p>
                      <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', margin: 0, marginBottom: '0.5rem' }}>
                        {deadline.formattedDate}
                      </p>
                      {deadline.description && (
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', margin: 0 }}>
                          {deadline.description}
                        </p>
                      )}
                    </div>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      color: deadline.remainingValue <= 7 ? 'var(--accent-danger)' : 'var(--accent-primary)',
                      background: deadline.remainingValue <= 7 ? 'var(--accent-danger-light)' : 'var(--accent-primary-light)',
                      padding: '0.375rem 0.75rem',
                      borderRadius: 'var(--radius-md)',
                      whiteSpace: 'nowrap',
                      flexShrink: 0
                    }}>
                      {deadline.remaining}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxCompliance;
