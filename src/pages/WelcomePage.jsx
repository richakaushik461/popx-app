import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import './WelcomePage.css';

export default function WelcomePage() {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="welcome-container">
      <button className="theme-toggle-welcome" onClick={toggleTheme}>
        {isDarkMode ? '☀️' : '🌙'}
      </button>
      
      <div className="welcome-content">
        <motion.div 
          className="welcome-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="logo-container">
            <div className="logo-icon">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="20" fill="url(#gradient)" />
                <path d="M14 28L26 20L14 12V28Z" fill="white" />
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="40" y2="40">
                    <stop stopColor="#6b4ee9" />
                    <stop offset="1" stopColor="#9d6ef5" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
          
          <h1 className="welcome-title">Welcome to PopX</h1>
          <p className="welcome-subtitle">
            Lorem ipsum dolor sit amet,<br />consectetur adipiscing elit.
          </p>
        </motion.div>

        <motion.div 
          className="welcome-actions"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <button 
            className="btn-primary welcome-btn"
            onClick={() => navigate('/signup')}
          >
            Create Account
          </button>
          
          <button 
            className="btn-secondary welcome-btn"
            onClick={() => navigate('/signin')}
          >
            Already Registered? Login
          </button>
        </motion.div>
      </div>
    </div>
  );
}