import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import './SignInPage.css';

export default function SignInPage() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      setTimeout(() => {
        signIn(formData.email, formData.password);
        navigate('/account');
        setIsLoading(false);
      }, 800);
    }
  };

  return (
    <div className="signin-container">
      <button className="theme-toggle-page" onClick={toggleTheme}>
        {isDarkMode ? '☀️' : '🌙'}
      </button>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <button className="back-button" onClick={() => navigate('/')}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
          Back
        </button>
      </motion.div>

      <div className="signin-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h1 className="signin-title">Signin to your PopX account</h1>
          <p className="signin-subtitle">
            Lorem ipsum dolor sit amet,<br />consectetur adipiscing elit.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="signin-form">
          <motion.div 
            className="input-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <label className="input-label">Email Address</label>
            <input
              type="email"
              className={`input-field ${errors.email ? 'error' : ''}`}
              placeholder="Enter email address"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </motion.div>

          <motion.div 
            className="input-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <label className="input-label">Password</label>
            <input
              type="password"
              className={`input-field ${errors.password ? 'error' : ''}`}
              placeholder="Enter password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <button 
              type="submit" 
              className="btn-primary signin-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading-spinner"></span>
              ) : (
                'Login'
              )}
            </button>
          </motion.div>
        </form>
      </div>
    </div>
  );
}