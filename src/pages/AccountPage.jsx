import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import './AccountPage.css';

export default function AccountPage() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  return (
    <div className="account-container">
      <button className="theme-toggle-page" onClick={toggleTheme}>
        {isDarkMode ? '☀️' : '🌙'}
      </button>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <button className="back-button" onClick={() => navigate(-1)}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
          Back
        </button>
      </motion.div>

      <div className="account-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="account-title">Account Settings</h1>
        </motion.div>

        <motion.div 
          className="profile-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="profile-avatar">
            <div className="avatar-placeholder">
              {user?.name?.charAt(0) || 'M'}
            </div>
          </div>
          
          <div className="profile-info">
            <h2 className="profile-name">{user?.name || 'Marry Doe'}</h2>
            <p className="profile-email">{user?.email || 'Marry@gmail.com'}</p>
          </div>
        </motion.div>

        <motion.div 
          className="profile-description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="description-text">
            Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, 
            Sed Diam Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore 
            Magna Aliquyam Erat, Sed Diam
            </p>
        </motion.div>

        <motion.div 
          className="account-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <button className="btn-secondary signout-btn" onClick={handleSignOut}>
            Sign Out
          </button>
        </motion.div>
      </div>
    </div>
  );
}