import React, { useState, useEffect } from 'react';
import { AuthContext } from './authContextInstance';
import authService, { DEMO_ACCOUNTS } from '../services/authService';

export function AuthProvider({ children }) {
  // Hydrate auth state synchronously on initialization
  const [token, setToken] = useState(() => {
    return localStorage.getItem('token') || null;
  });

  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (e) {
      console.error('Failed to parse initial stored user data:', e);
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [backendNotice, setBackendNotice] = useState('');

  // Synchronize across tabs or local storage clears
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'token' && !e.newValue) {
        setUser(null);
        setToken(null);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const login = async ({ identifier, password, role }) => {
    setIsLoading(true);
    try {
      const result = await authService.login({ identifier, password, role });
      
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.user));

      setToken(result.token);
      setUser(result.user);
      setBackendNotice(result.notice || '');

      return result;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    setIsLoading(true);
    try {
      const result = await authService.register(userData);
      setBackendNotice(result.notice || '');
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setToken(null);
    setBackendNotice('');
  };

  const setDemoSession = (role) => {
    const demoUser = DEMO_ACCOUNTS[role] || DEMO_ACCOUNTS.mahasiswa;
    const demoToken = `mock-demo-jwt-${role}-${Date.now()}`;

    localStorage.setItem('token', demoToken);
    localStorage.setItem('user', JSON.stringify(demoUser));

    setToken(demoToken);
    setUser(demoUser);
    setBackendNotice(`Aktif sebagai demo ${role.toUpperCase()}`);
    return demoUser;
  };

  const value = {
    user,
    token,
    isAuthenticated: Boolean(token && user),
    isLoading,
    backendNotice,
    login,
    register,
    logout,
    setDemoSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
