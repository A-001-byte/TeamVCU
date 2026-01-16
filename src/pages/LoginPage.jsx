/**
 * Login Page Component - Modern authentication with glassmorphism
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Loader2, AlertCircle, Info } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import '../index.css';

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [incomeType, setIncomeType] = useState('salary');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, signup, isAuthenticated, isLoading: authLoading, setIsAuthenticated, setUser } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, authLoading, navigate]);

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="login-page-container">
        <div className="login-card">
          <div className="login-card-content" style={{ textAlign: 'center', padding: '3rem' }}>
            <Loader2 className="login-loader" size={32} style={{ margin: '0 auto' }} />
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Demo mode: Simulate API delay and bypass backend
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      // Demo mode: Accept any credentials and simulate successful login
      const demoUser = {
        id: isSignUp ? `user-${Date.now()}` : 'demo-admin-001',
        name: isSignUp ? (name || 'Demo User') : 'Demo Admin',
        email: email || 'demo@thinktwice.com',
        role: isSignUp ? 'user' : 'admin'
      };

      const demoToken = `demo-token-${Date.now()}`;
      
      // Store in localStorage
      localStorage.setItem('thinktwice_token', demoToken);
      localStorage.setItem('thinktwice_user', JSON.stringify(demoUser));

      // Update auth context state directly
      setIsAuthenticated(true);
      setUser(demoUser);

      // Redirect to dashboard
      navigate('/');
    } catch (err) {
      // Even if there's an error, proceed with demo mode
      console.log('Demo mode - proceeding anyway:', err.message);
      // Still redirect for demo purposes
      setTimeout(() => {
        navigate('/');
      }, 500);
    } finally {
      setIsLoading(false);
    }
  };

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
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="login-page-container">
      <motion.div
        className="login-card"
        variants={card3DVariants}
        initial="rest"
        whileHover="hover"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="login-card-content"
        >
          {/* Logo Section */}
          <div className="login-logo-section">
            <motion.div 
              className="login-logo-icon-wrapper"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="login-logo-currency">₹</span>
            </motion.div>
            <div>
              <h1 className="login-logo-title">ThinkTwice</h1>
              <p className="login-logo-subtitle">Smart Expense Tracking</p>
            </div>
          </div>

          {/* Form Header */}
          <div className="login-form-header">
            <h2 className="login-form-title">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="login-form-subtitle">
              {isSignUp 
                ? 'Sign up to start tracking your expenses' 
                : 'Sign in to continue to your dashboard'}
            </p>
          </div>

          {/* Demo Credentials Info */}
          {!isSignUp && (
            <motion.div
              className="login-demo-info"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Info size={16} />
              <div className="login-demo-content">
                <span className="login-demo-label">Demo Admin:</span>
                <span className="login-demo-credentials">admin@thinktwice.com / admin123</span>
              </div>
            </motion.div>
          )}

          {/* Error Message */}
          {error && (
            <motion.div
              className="login-error-message"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertCircle size={16} />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="login-form">
            {/* Name Input (Sign Up only) */}
            {isSignUp && (
              <div className="login-input-wrapper">
                <input
                  type="text"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="login-input"
                  required
                />
              </div>
            )}

            {/* Email Input */}
            <div className="login-input-wrapper">
              <Mail className="login-input-icon" size={18} />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login-input"
                required
              />
            </div>

            {/* Password Input */}
            <div className="login-input-wrapper">
              <Lock className="login-input-icon" size={18} />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
                required
              />
            </div>

            {/* Additional Fields for Sign Up */}
            {isSignUp && (
              <>
                <div className="login-input-wrapper">
                  <input
                    type="number"
                    placeholder="Monthly income (₹)"
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(e.target.value)}
                    className="login-input"
                    required
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="login-input-wrapper">
                  <select
                    value={incomeType}
                    onChange={(e) => setIncomeType(e.target.value)}
                    className="login-input"
                    required
                  >
                    <option value="salary">Salary</option>
                    <option value="freelance">Freelance</option>
                    <option value="business">Business</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </>
            )}

            {/* Sign In Button */}
            <motion.button
              type="submit"
              className="login-submit-btn"
              disabled={isLoading}
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
            >
              {isLoading ? (
                <>
                  <Loader2 className="login-loader" size={18} />
                  <span>{isSignUp ? 'Creating account...' : 'Signing in...'}</span>
                </>
              ) : (
                <span>{isSignUp ? 'Sign Up' : 'Sign In'}</span>
              )}
            </motion.button>

            {/* Demo Mode Notice */}
            <p className="login-demo-mode-notice">
              Demo Mode: Any credentials will work
            </p>
          </form>

          {/* Footer */}
          <div className="login-footer">
            <p className="login-footer-text">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                }}
                className="login-footer-link"
              >
                {isSignUp ? ' Sign In' : ' Sign Up'}
              </button>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
