import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Loader, AlertTriangle, MapPin, Star } from 'lucide-react';
import { useCaData } from '../hooks/useCaData';

const FindCaPage = () => {
  const { cas, loading, error } = useCaData();

  return (
    <div className="page-container">
      <div className="page-header">
        <Link to="/tax-compliance" className="back-button">
          <ArrowLeft size={18} />
          Back to Tax Hub
        </Link>
        <h1 className="page-title">Connect with a Chartered Accountant</h1>
        <p className="page-subtitle">Find trusted CAs to help you with your tax needs.</p>
      </div>

      <div className="page-content">
        {loading ? (
          <div className="centered">
            <Loader className="animate-spin" size={48} />
            <p>Finding available CAs...</p>
          </div>
        ) : error ? (
          <div className="centered">
            <AlertTriangle size={48} className="text-red-500" />
            <p className="error-message">{error}</p>
          </div>
        ) : (
          <div className="ca-list-container">
            {cas.map(ca => (
              <div className="ca-card-large" key={ca.id}>
                <img src={ca.image} alt={`Portrait of ${ca.name}`} className="ca-avatar-large" />
                <div className="ca-details">
                  <h2 className="ca-name-large">{ca.name}</h2>
                  <div className="ca-meta-large">
                    <span><MapPin size={16} /> {ca.location}</span>
                    <span><Star size={16} className="text-yellow-500" /> {ca.rating} ({ca.reviews} reviews)</span>
                  </div>
                  <div className="ca-expertise-large">
                    <strong>Expertise:</strong> {ca.expertise}
                  </div>
                  <button className="profile-edit-btn connect-btn">Connect</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FindCaPage;
