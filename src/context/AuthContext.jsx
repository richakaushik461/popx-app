import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('popx_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const signIn = (email, password) => {
    const mockUser = { name: 'Marry Doe', email };
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('popx_user', JSON.stringify(mockUser));
    return true;
  };

  const signUp = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('popx_user', JSON.stringify(userData));
    return true;
  };

  const signOut = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('popx_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};