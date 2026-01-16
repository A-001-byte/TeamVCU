/**
 * Financial Autopsy Page - Detailed view of high-impact expenses
 */

import { motion } from 'framer-motion';
import { useDashboardData } from '../hooks/useDashboardData';
import FinancialAutopsy from '../components/FinancialAutopsy';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { ArrowLeft, Home, Shield, TrendingUp, FileSearch, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

function FinancialAutopsyPage() {
  const { data, loading, error } = useDashboardData();
  const { autopsyReport } = data || {};
  const location = useLocation();

  const card3DVariants = {
    rest: { 
      rotateX: 0, 
      rotateY: 0,
      scale: 1,
      transition: { duration: 0.3 }
    },
    hover: { 
      rotateX: -5,
      rotateY: 5,
      scale: 1.02,
      transition: { duration: 0.3 }
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <ErrorMessage message={error} />
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <Link to="/" className="back-button">
          <ArrowLeft size={20} />
          Back to Dashboard
        </Link>
        <div>
          <h1 className="page-title">Financial Autopsy</h1>
          <p className="page-subtitle">Top 5 high-impact expenses affecting your finances</p>
        </div>
      </div>

      <motion.div
        className="page-content"
        variants={card3DVariants}
        initial="rest"
        whileHover="hover"
      >
        <div className="chart-card">
          <FinancialAutopsy report={autopsyReport} />
        </div>
      </motion.div>

      {/* Bottom Navigation Bar (Mobile Only) */}
      <nav className="bottom-nav">
        <Link to="/" className={`bottom-nav-item ${location.pathname === '/' ? 'active' : ''}`}>
          <Home size={20} />
          <span>Dashboard</span>
        </Link>
        <Link to="/financial-twin" className={`bottom-nav-item ${location.pathname === '/financial-twin' ? 'active' : ''}`}>
          <Shield size={20} />
          <span>Twin</span>
        </Link>
        <Link to="/burn-rate" className={`bottom-nav-item ${location.pathname === '/burn-rate' ? 'active' : ''}`}>
          <TrendingUp size={20} />
          <span>Burn Rate</span>
        </Link>
        <Link to="/financial-autopsy" className={`bottom-nav-item ${location.pathname === '/financial-autopsy' ? 'active' : ''}`}>
          <FileSearch size={20} />
          <span>Autopsy</span>
        </Link>
        <button className="bottom-nav-item">
          <Settings size={20} />
          <span>More</span>
        </button>
      </nav>
    </div>
  );
}

export default FinancialAutopsyPage;
