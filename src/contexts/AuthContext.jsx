import React, { createContext, useState, useEffect, useContext } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      if (authService.isAuthenticated()) {
        try {
          const userData = await authService.getCurrentUser();
          setCurrentUser(userData);
        } catch (err) {
          console.error("Failed to load user:", err);
          await authService.logout(); // Clear invalid token
        }
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.register(userData);
      setCurrentUser(response.user);
      return response;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login(email, password);
      setCurrentUser(response.user);
      return response;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authService.logout();
      setCurrentUser(null);
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setLoading(false);
    }
  };

  const githubLogin = () => {
    authService.githubLogin();
  };

  const unlinkGithub = async () => {
    setLoading(true);
    try {
      await authService.unlinkGithub();
      // Refresh user data
      const userData = await authService.getCurrentUser();
      setCurrentUser(userData);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const getGithubStatus = async () => {
    try {
      return await authService.getGithubStatus();
    } catch (err) {
      console.error("Failed to get GitHub status:", err);
      return { is_github_connected: false };
    }
  };

  const value = {
    currentUser,
    setCurrentUser,
    loading,
    error,
    register,
    login,
    logout,
    githubLogin,
    unlinkGithub,
    getGithubStatus,
    isAuthenticated: authService.isAuthenticated()
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 