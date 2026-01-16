/**
 * Profile Page Component - User profile management
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { 
  User, Mail, Lock, DollarSign, Briefcase, 
  LogOut, Save, Edit2, ArrowLeft, ArrowRight, Shield, 
  Bell, CreditCard, Globe, Trash2
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import '../index.css';

export default function ProfilePage() {
  const navigate = useNavigate();
  const auth = useAuth();
  
  // Safely destructure with defaults
  const user = auth?.user || null;
  const logout = auth?.logout || (() => {
    localStorage.removeItem('thinktwice_token');
    localStorage.removeItem('thinktwice_user');
    navigate('/login');
  });
  const setUser = auth?.setUser || (() => {});
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    monthlyIncome: '',
    incomeType: 'salary',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        monthlyIncome: user.monthlyIncome || user.monthly_income || '',
        incomeType: user.incomeType || user.income_type || 'salary',
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    if (!user || !setUser) return;
    
    setIsSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user in localStorage and context
      const updatedUser = {
        ...user,
        name: formData.name,
        email: formData.email,
        monthlyIncome: parseFloat(formData.monthlyIncome) || 0,
        monthly_income: parseFloat(formData.monthlyIncome) || 0,
        incomeType: formData.incomeType,
        income_type: formData.incomeType,
      };
      
      localStorage.setItem('thinktwice_user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      setIsSaving(false);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    if (logout) {
      logout();
      navigate('/login');
    }
  };

  const getInitials = (name) => {
    if (!name || typeof name !== 'string') return 'U';
    try {
      return name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    } catch {
      return 'U';
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
    <div className="page-container">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <div className="page-header">
          <Link to="/" className="back-button">
            <ArrowLeft size={18} />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="page-title">Profile Settings</h1>
          <p className="page-subtitle">Manage your account information and preferences</p>
        </div>

        <div className="profile-content-grid">
          {/* Profile Card */}
          <motion.div
            className="profile-main-card"
            variants={card3DVariants}
            initial="rest"
            whileHover="hover"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="profile-header">
              <div className="profile-avatar-large">
                <span>{getInitials(user?.name)}</span>
              </div>
              <div className="profile-header-info">
                <h2 className="profile-name-large">{user?.name || 'User'}</h2>
                <p className="profile-email-large">{user?.email || 'No email'}</p>
                {user?.role && (
                  <span className="profile-role-badge">
                    {user.role === 'admin' ? 'Administrator' : 'User'}
                  </span>
                )}
              </div>
              {!isEditing && (
                <motion.button
                  className="profile-edit-btn"
                  onClick={() => setIsEditing(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Edit2 size={18} />
                  <span>Edit Profile</span>
                </motion.button>
              )}
            </div>

            {isEditing ? (
              <div className="profile-edit-form">
                <div className="profile-form-group">
                  <label className="profile-form-label">
                    <User size={16} />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="profile-form-input"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="profile-form-group">
                  <label className="profile-form-label">
                    <Mail size={16} />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="profile-form-input"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="profile-form-group">
                  <label className="profile-form-label">
                    <DollarSign size={16} />
                    Monthly Income
                  </label>
                  <input
                    type="number"
                    name="monthlyIncome"
                    value={formData.monthlyIncome}
                    onChange={handleInputChange}
                    className="profile-form-input"
                    placeholder="Enter monthly income"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div className="profile-form-group">
                  <label className="profile-form-label">
                    <Briefcase size={16} />
                    Income Type
                  </label>
                  <select
                    name="incomeType"
                    value={formData.incomeType}
                    onChange={handleInputChange}
                    className="profile-form-input"
                  >
                    <option value="salary">Salary</option>
                    <option value="freelance">Freelance</option>
                    <option value="business">Business</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="profile-form-actions">
                  <motion.button
                    className="profile-cancel-btn"
                    onClick={() => {
                      setIsEditing(false);
                      // Reset form data
                      if (user) {
                        setFormData({
                          name: user.name || '',
                          email: user.email || '',
                          monthlyIncome: user.monthlyIncome || '',
                          incomeType: user.incomeType || 'salary',
                        });
                      }
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    className="profile-save-btn"
                    onClick={handleSave}
                    disabled={isSaving}
                    whileHover={{ scale: isSaving ? 1 : 1.02 }}
                    whileTap={{ scale: isSaving ? 1 : 0.98 }}
                  >
                    {isSaving ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Save size={18} />
                        </motion.div>
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save size={18} />
                        <span>Save Changes</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            ) : (
              <div className="profile-info-grid">
                <div className="profile-info-item">
                  <div className="profile-info-icon">
                    <User size={20} />
                  </div>
                  <div className="profile-info-content">
                    <span className="profile-info-label">Full Name</span>
                    <span className="profile-info-value">{user?.name || 'Not set'}</span>
                  </div>
                </div>
                <div className="profile-info-item">
                  <div className="profile-info-icon">
                    <Mail size={20} />
                  </div>
                  <div className="profile-info-content">
                    <span className="profile-info-label">Email</span>
                    <span className="profile-info-value">{user?.email || 'Not set'}</span>
                  </div>
                </div>
                <div className="profile-info-item">
                  <div className="profile-info-icon">
                    <DollarSign size={20} />
                  </div>
                  <div className="profile-info-content">
                    <span className="profile-info-label">Monthly Income</span>
                    <span className="profile-info-value">
                      {(user?.monthlyIncome || user?.monthly_income) 
                        ? `₹${(user.monthlyIncome || user.monthly_income).toLocaleString()}` 
                        : 'Not set'}
                    </span>
                  </div>
                </div>
                <div className="profile-info-item">
                  <div className="profile-info-icon">
                    <Briefcase size={20} />
                  </div>
                  <div className="profile-info-content">
                    <span className="profile-info-label">Income Type</span>
                    <span className="profile-info-value">
                      {(user?.incomeType || user?.income_type) 
                        ? (user.incomeType || user.income_type).charAt(0).toUpperCase() + (user.incomeType || user.income_type).slice(1) 
                        : 'Not set'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Settings Cards */}
          <div className="profile-settings-column">
            <motion.div
              className="profile-settings-card"
              variants={itemVariants}
            >
              <h3 className="profile-settings-title">Account</h3>
              <div className="profile-settings-list">
                <button className="profile-settings-item">
                  <Lock size={18} />
                  <span>Change Password</span>
                  <ArrowRight size={16} />
                </button>
                <button className="profile-settings-item">
                  <Shield size={18} />
                  <span>Privacy & Security</span>
                  <ArrowRight size={16} />
                </button>
                <button className="profile-settings-item">
                  <CreditCard size={18} />
                  <span>Payment Methods</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>

            <motion.div
              className="profile-settings-card"
              variants={itemVariants}
            >
              <h3 className="profile-settings-title">Preferences</h3>
              <div className="profile-settings-list">
                <button className="profile-settings-item">
                  <Bell size={18} />
                  <span>Notifications</span>
                  <ArrowRight size={16} />
                </button>
                <button className="profile-settings-item">
                  <Globe size={18} />
                  <span>Language & Region</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>

            <motion.div
              className="profile-settings-card"
              variants={itemVariants}
            >
              <h3 className="profile-settings-title">Danger Zone</h3>
              <div className="profile-settings-list">
                <button 
                  className="profile-settings-item danger"
                  onClick={handleLogout}
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                  <ArrowRight size={16} />
                </button>
                <button className="profile-settings-item danger">
                  <Trash2 size={18} />
                  <span>Delete Account</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
