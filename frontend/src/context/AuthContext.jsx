import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // ✅ The empty bracket [] at the end is CRITICAL. 
  // It tells React to only run this fetch ONCE when the app starts.
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('token');
      
      if (storedToken) {
        setToken(storedToken);
        api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        
        try {
          // Fetch the user's latest data from the backend
          const res = await api.get('/auth/profile');
          // Our backend sends { success: true, data: { ...user } }
          setUser(res.data.data); 
        } catch (error) {
          console.error('Session expired or invalid token');
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
          delete api.defaults.headers.common['Authorization'];
        }
      }
      
      setLoading(false);
    };

    initAuth();
  }, []); // <--- THIS EMPTY ARRAY PREVENTS THE INFINITE LOOP

  const login = async (credentials) => {
    const res = await api.post('/auth/login', credentials);
    const { token: t, user: u } = res.data;
    
    setToken(t);
    setUser(u);
    localStorage.setItem('token', t);
    api.defaults.headers.common['Authorization'] = `Bearer ${t}`;
    return u;
  };

  const register = async (userData) => {
    const res = await api.post('/auth/signup', userData);
    const { token: t, user: u } = res.data;
    
    setToken(t);
    setUser(u);
    localStorage.setItem('token', t);
    api.defaults.headers.common['Authorization'] = `Bearer ${t}`;
    return u;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      loading, 
      login, 
      register, 
      signup: register, 
      logout, 
      isAuthenticated: !!user // ✅ Restored this so your Navbar works perfectly
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};