/**
 * Dashboard Component - ThinkTwice Dashboard with 3D animations
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, TrendingDown, Wallet, ShoppingCart, 
  Utensils, Home, Plus, MoreVertical, Calendar, Settings, 
  CreditCard, PieChart, Bell, Search, Shield, 
  Award, Users, ArrowUpRight, ArrowDownRight, Brain, FileSearch, ArrowRight
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CHART_DATA, TRANSACTIONS, STATS_DATA, TRUST_INDICATORS } from '../data/mockData';
import { formatCurrency } from '../utils/formatters';
import { useDashboardData } from '../hooks/useDashboardData';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ThinkTwiceDashboard() {
  const [timeRange, setTimeRange] = useState('1month');
  const { data } = useDashboardData();
  const { financialTwin, burnRate, autopsyReport, savings } = data || {};
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Get user initials for avatar
  const getUserInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Get user's first name for greeting
  const getUserFirstName = (name) => {
    if (!name) return 'User';
    return name.split(' ')[0];
  };
  
  const chartData = CHART_DATA;
  const transactions = TRANSACTIONS.map(t => ({
    ...t,
    icon: t.category === 'food' ? Utensils : t.category === 'payment' ? Wallet : Home
  }));
  const stats = STATS_DATA.map(s => ({
    ...s,
    icon: s.label === 'Total Balance' ? Wallet : s.label === 'Total Expenses' ? ShoppingCart : TrendingUp
  }));
  const trustIndicators = TRUST_INDICATORS.map((t, i) => ({
    ...t,
    icon: i === 0 ? Shield : i === 1 ? Users : Award
  }));

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="thinktwice-dashboard">
      {/* Top Header Bar */}
      <motion.div 
        className="dashboard-header-bar"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="header-container">
          <div className="header-left-section">
            <motion.div 
              className="logo-section"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="logo-icon-wrapper">
                <span className="logo-currency">₹</span>
              </div>
              <div>
                <h1 className="logo-title">ThinkTwice</h1>
                <p className="logo-subtitle">Smart Expense Tracking</p>
              </div>
            </motion.div>
            
            {/* Trust Badges */}
            <div className="trust-badges">
              {trustIndicators.map((item, index) => (
                <motion.div 
                  key={index} 
                  className="trust-badge"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="trust-icon">
                    <item.icon size={16} />
                  </div>
                  <div className="trust-text">
                    <p className="trust-title">{item.text}</p>
                    <p className="trust-subtitle">{item.subtext}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="header-right-section">
            <div className="search-wrapper">
              <Search className="search-icon" size={16} />
              <input 
                type="text" 
                placeholder="Search transactions..." 
                className="search-input"
              />
            </div>
            <motion.button 
              className="icon-btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Bell size={20} />
              <span className="notification-dot"></span>
            </motion.button>
            <button className="header-link">Need Help?</button>
            <button className="header-link">Read Our Blog</button>
            <motion.div 
              className="profile-section"
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate('/profile')}
              style={{ cursor: 'pointer' }}
            >
              <div className="profile-avatar">
                <span>{getUserInitials(user?.name)}</span>
              </div>
              <span className="profile-name">Hi, {getUserFirstName(user?.name)}</span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="dashboard-content">
        <motion.div 
          className="dashboard-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Sidebar */}
          <motion.aside className="dashboard-sidebar" variants={itemVariants}>
            <div className="sidebar-card">
              <nav className="sidebar-nav">
                <motion.button 
                  className="nav-item active"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Home size={20} />
                  Dashboard
                </motion.button>
                <motion.button 
                  className="nav-item"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Calendar size={20} />
                  Bills & Payments
                </motion.button>
                <motion.button 
                  className="nav-item"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ShoppingCart size={20} />
                  Expenses
                  <span className="nav-badge">New</span>
                </motion.button>
                <motion.button 
                  className="nav-item"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <PieChart size={20} />
                  Analytics
                </motion.button>
                <Link to="/financial-twin" style={{ textDecoration: 'none' }}>
                  <motion.button 
                    className="nav-item"
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Brain size={20} />
                    Financial Twin
                  </motion.button>
                </Link>
                <Link to="/burn-rate" style={{ textDecoration: 'none' }}>
                  <motion.button 
                    className="nav-item"
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <TrendingUp size={20} />
                    Burn Rate
                  </motion.button>
                </Link>
                <Link to="/financial-autopsy" style={{ textDecoration: 'none' }}>
                  <motion.button 
                    className="nav-item"
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FileSearch size={20} />
                    Financial Autopsy
                  </motion.button>
                </Link>
                <motion.button 
                  className="nav-item"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <CreditCard size={20} />
                  Cards
                </motion.button>
                <motion.button 
                  className="nav-item"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Settings size={20} />
                  Settings
                </motion.button>
              </nav>
            </div>

            {/* Security Badge */}
            <motion.div 
              className="security-badge"
              variants={card3DVariants}
              initial="rest"
              whileHover="hover"
            >
              <div className="security-icon">
                <Shield size={20} />
              </div>
              <div>
                <p className="security-title">RBI Compliant</p>
                <p className="security-text">Your data is encrypted with bank-grade security standards</p>
              </div>
            </motion.div>
          </motion.aside>

          {/* Main Content */}
          <main className="dashboard-main">
            {/* Stats Cards */}
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="stat-card"
                  variants={card3DVariants}
                  initial="rest"
                  whileHover="hover"
                >
                  <div className="stat-header">
                    <div>
                      <p className="stat-label">{stat.label}</p>
                      <h3 className="stat-amount">{formatCurrency(stat.amount)}</h3>
                    </div>
                    <div className={`stat-icon-wrapper ${stat.bgColor}`}>
                      <stat.icon size={24} />
                    </div>
                  </div>
                  <div className="stat-trend">
                    {stat.isPositive ? (
                      <ArrowUpRight size={16} className="trend-up" />
                    ) : (
                      <ArrowDownRight size={16} className="trend-down" />
                    )}
                    <span className={`trend-text ${stat.isPositive ? 'positive' : 'negative'}`}>
                      {stat.trend}
                    </span>
                    <span className="trend-label">vs last month</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Chart Card */}
            <motion.div 
              className="chart-card"
              variants={card3DVariants}
              initial="rest"
              whileHover="hover"
            >
              <div className="chart-header">
                <div>
                  <h2 className="chart-title">Expense Analytics</h2>
                  <p className="chart-subtitle">Track your spending patterns</p>
                </div>
                <div className="time-range-buttons">
                  {['1 Month', '3 Month', '6 Month', '1 Year'].map((period) => (
                    <motion.button
                      key={period}
                      onClick={() => setTimeRange(period.toLowerCase().replace(' ', ''))}
                      className={`time-btn ${timeRange === period.toLowerCase().replace(' ', '') ? 'active' : ''}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {period}
                    </motion.button>
                  ))}
                </div>
              </div>
              
              <div className="chart-legend">
                <div className="legend-item">
                  <div className="legend-dot food"></div>
                  <span>Food & Drinks</span>
                </div>
                <div className="legend-item">
                  <div className="legend-dot shopping"></div>
                  <span>Shopping</span>
                </div>
              </div>

              <ResponsiveContainer width="100%" height={340}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" stroke="#6b7280" style={{ fontSize: '13px', fontWeight: '500' }} />
                  <YAxis stroke="#6b7280" style={{ fontSize: '13px', fontWeight: '500' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: 'none',
                      borderRadius: '12px', 
                      boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                      padding: '12px'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="food" 
                    stroke="#f59e0b" 
                    strokeWidth={3} 
                    dot={{ r: 6, fill: '#f59e0b', strokeWidth: 2, stroke: '#fff' }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="shopping" 
                    stroke="#3b82f6" 
                    strokeWidth={3} 
                    dot={{ r: 6, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Financial Intelligence Cards */}
            <div className="intelligence-grid">
              {/* Financial Twin Summary Card */}
              {financialTwin && (
                <Link to="/financial-twin" style={{ textDecoration: 'none' }}>
                  <motion.div
                    className="intelligence-card"
                    variants={card3DVariants}
                    initial="rest"
                    whileHover="hover"
                  >
                    <div className="intelligence-header">
                      <div className="intelligence-icon-wrapper" style={{ background: 'var(--accent-success)' }}>
                        <Shield size={24} />
                      </div>
                      <ArrowRight size={20} className="intelligence-arrow" />
                    </div>
                    <h3 className="intelligence-title">Financial Twin</h3>
                    <p className="intelligence-subtitle">AI-powered financial health assessment</p>
                    <div className="intelligence-metrics">
                      <div className="intelligence-metric">
                        <span className="intelligence-metric-label">Stability Level</span>
                        <span className="intelligence-metric-value">{financialTwin.risk || 'LOW'}</span>
                      </div>
                      <div className="intelligence-metric">
                        <span className="intelligence-metric-label">Runway</span>
                        <span className="intelligence-metric-value">
                          {financialTwin.runwayMonths === Infinity ? '∞' : `${financialTwin.runwayMonths?.toFixed(1) || 0}m`}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              )}

              {/* Burn Rate Summary Card */}
              {burnRate && (
                <Link to="/burn-rate" style={{ textDecoration: 'none' }}>
                  <motion.div
                    className="intelligence-card"
                    variants={card3DVariants}
                    initial="rest"
                    whileHover="hover"
                  >
                    <div className="intelligence-header">
                      <div className="intelligence-icon-wrapper" style={{ background: 'var(--accent-primary)' }}>
                        <TrendingUp size={24} />
                      </div>
                      <ArrowRight size={20} className="intelligence-arrow" />
                    </div>
                    <h3 className="intelligence-title">Burn Rate</h3>
                    <p className="intelligence-subtitle">Time until savings depletion</p>
                    <div className="intelligence-metrics">
                      <div className="intelligence-metric">
                        <span className="intelligence-metric-label">Months Left</span>
                        <span className="intelligence-metric-value">{burnRate.monthsLeft?.toFixed(1) || '0'}</span>
                      </div>
                      <div className="intelligence-metric">
                        <span className="intelligence-metric-label">Runway Status</span>
                        <span 
                          className="intelligence-metric-value"
                          style={{
                            color: burnRate.warning === 'Critical' ? 'var(--accent-danger)' :
                                   burnRate.warning === 'Caution' ? '#d97706' : 'var(--accent-success)'
                          }}
                        >
                          {burnRate.warning || 'Safe'}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              )}

              {/* Financial Autopsy Summary Card */}
              {autopsyReport && (
                <Link to="/financial-autopsy" style={{ textDecoration: 'none' }}>
                  <motion.div
                    className="intelligence-card"
                    variants={card3DVariants}
                    initial="rest"
                    whileHover="hover"
                  >
                    <div className="intelligence-header">
                      <div className="intelligence-icon-wrapper" style={{ background: 'var(--accent-purple)' }}>
                        <FileSearch size={24} />
                      </div>
                      <ArrowRight size={20} className="intelligence-arrow" />
                    </div>
                    <h3 className="intelligence-title">Financial Autopsy</h3>
                    <p className="intelligence-subtitle">Top 5 high-impact expenses</p>
                    <div className="intelligence-metrics">
                      <div className="intelligence-metric">
                        <span className="intelligence-metric-label">Expenses Analyzed</span>
                        <span className="intelligence-metric-value">{autopsyReport.length}</span>
                      </div>
                      <div className="intelligence-metric">
                        <span className="intelligence-metric-label">Top Expense</span>
                        <span className="intelligence-metric-value" style={{ fontSize: '0.75rem' }}>
                          {autopsyReport[0]?.merchant || 'N/A'}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              )}
            </div>
          </main>

          {/* Right Sidebar */}
          <motion.aside className="dashboard-right-sidebar" variants={itemVariants}>
            <div className="transactions-card">
              <div className="transactions-header">
                <div>
                  <h2 className="transactions-title">Transaction History</h2>
                  <p className="transactions-subtitle">Recent activities</p>
                </div>
                <Calendar className="calendar-icon" size={20} />
              </div>
              
              <div className="transactions-list">
                {transactions.map((transaction) => (
                  <motion.div
                    key={transaction.id}
                    className="transaction-item"
                    whileHover={{ x: 5, scale: 1.02 }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: transaction.id * 0.1 }}
                  >
                    <div className="transaction-left">
                      <div className={`transaction-icon ${transaction.isPositive ? 'emerald' : transaction.category === 'food' ? 'orange' : transaction.category === 'entertainment' ? 'purple' : 'rose'}`}>
                        <transaction.icon size={20} />
                      </div>
                      <div>
                        <p className="transaction-name">{transaction.name}</p>
                        <p className="transaction-date">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="transaction-right">
                      <p className={`transaction-amount ${transaction.isPositive ? 'positive' : 'negative'}`}>
                        {transaction.isPositive ? '+' : '-'}{formatCurrency(transaction.amount)}
                      </p>
                      <button className="transaction-more">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.button 
                className="add-transaction-btn"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Plus size={20} />
                Add New Transaction
              </motion.button>

              <div className="missing-transaction-banner">
                <p className="banner-title">Missing Transaction?</p>
                <p className="banner-text">Track all your expenses in one place with automated categorization</p>
              </div>
            </div>
          </motion.aside>
        </motion.div>
      </div>

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
