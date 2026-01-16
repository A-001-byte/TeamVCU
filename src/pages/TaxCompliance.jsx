import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, TrendingUp, Bell, AlertTriangle, Loader, Users } from 'lucide-react';
import { useTaxComplianceData } from '../hooks/useTaxComplianceData';

const TaxCompliance = () => {
  const { data, loading, error } = useTaxComplianceData();
  const { taxSavingSuggestions, deadlines } = data;

  // Function to calculate remaining days
  const calculateRemainingDays = (dateString) => {
    const deadlineDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    deadlineDate.setHours(0, 0, 0, 0);

    const diffTime = deadlineDate - today;
    if (diffTime < 0) {
      return 'Past';
    }
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} day(s)`;
  };

  const processedDeadlines = deadlines.map(d => ({ 
    ...d, 
    remaining: calculateRemainingDays(d.date),
    formattedDate: new Date(d.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })
  })).filter(d => d.remaining !== 'Past');

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
        <p className="page-subtitle">Your one-stop solution for managing your tax obligations for AY 2024-25.</p>
      </div>

      <div className="page-content">
        <div className="profile-content-grid">
          <div className="profile-main-card">
            <div className="profile-settings-card">
              <h2 className="profile-settings-title">ITR Preparation Tools</h2>
              <div className="profile-info-grid">
                <div className="profile-info-item">
                  <div className="profile-info-icon"><FileText size={20}/></div>
                  <div className="profile-info-content">
                    <span className="profile-info-label">Upload Form 16 & AIS</span>
                    <button className="profile-edit-btn" style={{marginTop: '10px'}}>Upload Documents</button>
                  </div>
                </div>
                <div className="profile-info-item">
                  <div className="profile-info-icon"><TrendingUp size={20}/></div>
                  <div className="profile-info-content">
                    <span className="profile-info-label">Pre-fill & File ITR</span>
                     <button className="profile-edit-btn" style={{marginTop: '10px'}}>Start Filing</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="profile-settings-card">
              <h2 className="profile-settings-title">Tax-Saving Guidelines (FY 2023-24)</h2>
              <div className="profile-settings-list">
                {taxSavingSuggestions.map((suggestion, index) => (
                  <div className="burn-rate-insight-item" key={index}>
                    <div className="burn-rate-insight-icon info"><TrendingUp size={16}/></div>
                    <div className="burn-rate-insight-text">
                      <strong>{suggestion.title}:</strong> {suggestion.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="profile-settings-card">
                <h2 className="profile-settings-title">Expert Tax Assistance</h2>
                <p className="page-subtitle" style={{marginBottom: '20px', marginTop: '4px'}}>Connect with qualified Chartered Accountants for personalized advice.</p>
                <Link to="/find-ca">
                    <button className="profile-edit-btn">Find a CA</button>
                </Link>
            </div>
          </div>

          <div className="profile-settings-column">
            <div className="profile-settings-card">
              <h2 className="profile-settings-title">Important Deadlines (AY 2024-25)</h2>
              <ul className="profile-settings-list">
                {processedDeadlines.map((deadline, index) => (
                  <li className="profile-settings-item" key={index}>
                    <Bell size={20} />
                    <span>{deadline.title} - <strong>{deadline.formattedDate}</strong> ({deadline.remaining} left)</span>
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
