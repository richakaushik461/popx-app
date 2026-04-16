import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import './SignUpPage.css';

export default function SignUpPage() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    password: '',
    companyName: '',
    isAgency: 'yes'
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      setTimeout(() => {
        signUp({ name: formData.fullName, email: formData.email, ...formData });
        navigate('/account');
        setIsLoading(false);
      }, 800);
    }
  };

  return (
    <div className="signup-container">
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

      <div className="signup-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h1 className="signup-title">Create your PopX account</h1>
        </motion.div>

        <form onSubmit={handleSubmit} className="signup-form">
          {[
            { name: 'fullName', label: 'Full Name', placeholder: 'Marry Doe', required: true },
            { name: 'phoneNumber', label: 'Phone number', placeholder: 'Marry Doe', required: true },
            { name: 'email', label: 'Email address', placeholder: 'Marry Doe', type: 'email', required: true },
            { name: 'password', label: 'Password', placeholder: 'Marry Doe', type: 'password', required: true },
            { name: 'companyName', label: 'Company name', placeholder: 'Marry Doe' }
          ].map((field, index) => (
            <motion.div 
              key={field.name}
              className="input-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
            >
              <label className="input-label">
                {field.label} {field.required && <span className="required">*</span>}
              </label>
              <input
                type={field.type || 'text'}
                className={`input-field ${errors[field.name] ? 'error' : ''}`}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}
              />
              {errors[field.name] && <span className="error-message">{errors[field.name]}</span>}
            </motion.div>
          ))}

          <motion.div 
            className="input-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <label className="input-label">Are you an Agency? <span className="required">*</span></label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="isAgency"
                  value="yes"
                  checked={formData.isAgency === 'yes'}
                  onChange={(e) => setFormData({...formData, isAgency: e.target.value})}
                />
                <span className="radio-custom"></span>
                Yes
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="isAgency"
                  value="no"
                  checked={formData.isAgency === 'no'}
                  onChange={(e) => setFormData({...formData, isAgency: e.target.value})}
                />
                <span className="radio-custom"></span>
                No
              </label>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <button 
              type="submit" 
              className="btn-primary signup-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading-spinner"></span>
              ) : (
                'Create Account'
              )}
            </button>
          </motion.div>
        </form>
      </div>
    </div>
  );
}