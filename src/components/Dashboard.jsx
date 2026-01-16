/**
 * Dashboard Component - ThinkTwice Dashboard with 3D animations
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, TrendingDown, Wallet, ShoppingCart, 
  Utensils, Home, Plus, MoreVertical, Calendar, Settings, 
  CreditCard, PieChart, Bell, Search, Shield, 
  Award, Users, ArrowUpRight, ArrowDownRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CHART_DATA, TRANSACTIONS, STATS_DATA, TRUST_INDICATORS } from '../data/mockData';
import { formatCurrency } from '../utils/formatters';

export default function ThinkTwiceDashboard() {
  const [timeRange, setTimeRange] = useState('1month');
  
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
            >
              <div className="profile-avatar">
                <span>A</span>
              </div>
              <span className="profile-name">Hi, Akhil</span>
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
                <Link to="/financial-snapshot" className='text-decoration-none'>
                  <motion.button 
                    className="nav-item"
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <PieChart size={20} />
                    Financial Snapshot
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
    </div>
  );
}
