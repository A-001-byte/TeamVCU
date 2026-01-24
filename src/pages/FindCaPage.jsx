import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Loader, AlertTriangle, MapPin, Star, Clock, MessageSquare, Zap } from 'lucide-react';
import { useCaData } from '../hooks/useCaData';

const FindCaPage = () => {
  const { cas, loading, error } = useCaData();
  const [selectedCa, setSelectedCa] = useState(null);

  const getBadgeColor = (badge) => {
    const colors = {
      'Top Rated': 'var(--accent-warning)',
      'Verified Expert': 'var(--accent-primary)',
      'Startup Expert': 'var(--accent-success)',
      'Fast Responder': 'var(--accent-purple)',
      'Specialist': 'var(--accent-orange)',
      'Trade Expert': 'var(--accent-primary)',
      'Real Estate Specialist': 'var(--accent-warning)',
      'Industrial Expert': 'var(--accent-success)',
    };
    return colors[badge] || 'var(--accent-primary)';
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <Link to="/tax-compliance" className="back-button">
          <ArrowLeft size={18} />
          Back to Tax Hub
        </Link>
        <h1 className="page-title">Find Your Perfect CA</h1>
        <p className="page-subtitle">9 top-rated Chartered Accountants ready to help you succeed</p>
      </div>

      <div className="page-content">
        {loading ? (
          <div className="page-container centered">
            <Loader className="animate-spin" size={48} />
            <p>Finding available CAs...</p>
          </div>
        ) : error ? (
          <div className="page-container centered">
            <AlertTriangle size={48} className="text-red-500" />
            <p className="error-message">{error}</p>
          </div>
        ) : (
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px'}}>
            {cas.map(ca => (
              <div 
                key={ca.id} 
                className="profile-settings-card"
                style={{
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                {/* Badge */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: getBadgeColor(ca.badge),
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.65rem',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {ca.badge}
                </div>

                {/* Avatar */}
                <div style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, var(--accent-primary), var(--accent-primary-light))`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  fontWeight: '700',
                  color: 'white',
                  margin: '0 auto 12px'
                }}>
                  {ca.name.split(' ').map(n => n[0]).join('')}
                </div>

                {/* Name & Location */}
                <h3 style={{fontSize: '1rem', fontWeight: '700', color: 'var(--text-primary)', margin: 0, marginBottom: '4px', textAlign: 'center'}}>
                  {ca.name}
                </h3>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginBottom: '12px'}}>
                  <MapPin size={14} color="var(--text-secondary)" />
                  <span style={{fontSize: '0.8125rem', color: 'var(--text-secondary)'}}>{ca.location}</span>
                </div>

                {/* Rating */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  marginBottom: '12px',
                  paddingBottom: '12px',
                  borderBottom: '1px solid var(--border-color)'
                }}>
                  <Star size={14} color="var(--accent-warning)" fill="var(--accent-warning)" />
                  <span style={{fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)'}}>{ca.rating}</span>
                  <span style={{fontSize: '0.75rem', color: 'var(--text-tertiary)'}}>{ca.reviews} reviews</span>
                </div>

                {/* Key Metrics */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '8px',
                  marginBottom: '12px'
                }}>
                  <div style={{
                    background: 'var(--bg-primary)',
                    padding: '8px',
                    borderRadius: 'var(--radius-md)',
                    textAlign: 'center',
                    border: '1px solid var(--border-light)'
                  }}>
                    <div style={{fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '2px'}}>Experience</div>
                    <div style={{fontSize: '0.9375rem', fontWeight: '700', color: 'var(--accent-primary)'}}>{ca.experience} yrs</div>
                  </div>
                  <div style={{
                    background: 'var(--bg-primary)',
                    padding: '8px',
                    borderRadius: 'var(--radius-md)',
                    textAlign: 'center',
                    border: '1px solid var(--border-light)'
                  }}>
                    <div style={{fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '2px'}}>Rate</div>
                    <div style={{fontSize: '0.9375rem', fontWeight: '700', color: 'var(--accent-primary)'}}>₹{ca.hourlyRate}/hr</div>
                  </div>
                </div>

                {/* Response Time & Availability */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginBottom: '12px',
                  padding: '8px',
                  background: 'var(--accent-success-light)',
                  borderRadius: 'var(--radius-md)'
                }}>
                  <Zap size={14} color="var(--accent-success)" />
                  <span style={{fontSize: '0.75rem', fontWeight: '600', color: 'var(--accent-success)'}}>
                    Responds in {ca.responseTime}
                  </span>
                </div>

                {/* Expertise Tags */}
                <div style={{marginBottom: '12px'}}>
                  <div style={{display: 'flex', flexWrap: 'wrap', gap: '6px'}}>
                    {ca.expertise.slice(0, 2).map((skill, idx) => (
                      <span key={idx} style={{
                        fontSize: '0.7rem',
                        background: 'var(--accent-primary-light)',
                        color: 'var(--accent-primary)',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontWeight: '600'
                      }}>
                        {skill}
                      </span>
                    ))}
                    {ca.expertise.length > 2 && (
                      <span style={{
                        fontSize: '0.7rem',
                        background: 'var(--border-light)',
                        color: 'var(--text-secondary)',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontWeight: '600'
                      }}>
                        +{ca.expertise.length - 2}
                      </span>
                    )}
                  </div>
                </div>

                {/* Consultation Mode & Languages */}
                <div style={{
                  display: 'flex',
                  gap: '6px',
                  marginBottom: '12px',
                  fontSize: '0.7rem',
                  color: 'var(--text-secondary)'
                }}>
                  <div>🌐 {ca.languages.slice(0, 2).join(', ')}</div>
                  <div>•</div>
                  <div>{ca.consultation.join(', ')}</div>
                </div>

                {/* Connect Button */}
                <button style={{
                  width: '100%',
                  padding: '10px 16px',
                  background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-primary-dark) 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: 'var(--radius-lg)',
                  fontWeight: '600',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-primary)',
                  transition: 'all 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                >
                  <MessageSquare size={16} />
                  Connect Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FindCaPage;
