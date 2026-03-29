import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token or set user
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // For simplicity, assume token is valid, in real app verify
      const userData = JSON.parse(localStorage.getItem('user'));
      setUser(userData);
    }
    setLoading(false);
  }, []);

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const login = async (email, password) => {
    const res = await axios.post(`${apiUrl}/api/auth/login`, { email, password });
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
    setUser(res.data.user);
  };

  const register = async (name, email, password) => {
    await axios.post(`${apiUrl}/api/auth/register`, { name, email, password });
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};