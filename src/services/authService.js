import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// Create axios instance with CSRF token
const createAxiosInstance = () => {
  const token = localStorage.getItem('authToken');
  
  return axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    }
  });
};

const authService = {
  register: async (userData) => {
    try {
      const response = await createAxiosInstance().post('/auth/signup', userData);
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  login: async (email, password) => {
    try {
      const response = await createAxiosInstance().post('/auth/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  logout: async () => {
    try {
      if (localStorage.getItem('authToken')) {
        await createAxiosInstance().post('/auth/logout');
      }
    } finally {
      localStorage.removeItem('authToken');
      localStorage.removeItem('githubId');
      localStorage.removeItem('email');
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await createAxiosInstance().get('/user');
      return response.data;
    } catch (error) {
      console.error("Error getting current user:", error);
      throw error.response ? error.response.data : error;
    }
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },

  githubLogin: () => {
    // The Laravel backend route to start GitHub OAuth
    window.location.href = `${API_URL}/auth/github`;
  },

  unlinkGithub: async () => {
    try {
      const response = await createAxiosInstance().delete('/auth/github/unlink');
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  getGithubStatus: async () => {
    try {
      const response = await createAxiosInstance().get('/auth/github/status');
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  }
};

export default authService; 