/**
 * Authentication Service
 */

import { apiClient } from '../utils/api';

const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
};

const TOKEN_KEY = 'thinktwice_token';
const USER_KEY = 'thinktwice_user';

export const authService = {
  /**
   * Login user
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<{token: string, user: object}>}
   */
  async login(email, password) {
    try {
      const response = await apiClient.post(AUTH_ENDPOINTS.LOGIN, {
        email,
        password,
      });

      const token = response.access_token;
      const user = response.user || null;
      
      if (token) {
        localStorage.setItem(TOKEN_KEY, token);
        // Store user info if provided
        if (user) {
          localStorage.setItem(USER_KEY, JSON.stringify(user));
        }
      }

      return { token, user };
    } catch (error) {
      // Handle network errors
      if (error.message.includes('fetch') || error.message.includes('Failed to fetch')) {
        throw new Error('Cannot connect to server. Please make sure the backend is running on http://localhost:5000');
      }
      throw new Error(error.message || 'Login failed. Please check your credentials.');
    }
  },

  /**
   * Sign up user
   * @param {object} userData - User registration data
   * @returns {Promise<{token: string, user: object}>}
   */
  async signup(userData) {
    try {
      const response = await apiClient.post(AUTH_ENDPOINTS.SIGNUP, userData);

      // If signup returns a token, store it
      if (response.access_token) {
        localStorage.setItem(TOKEN_KEY, response.access_token);
        if (response.user) {
          localStorage.setItem(USER_KEY, JSON.stringify(response.user));
        }
      }

      return { token: response.access_token || null, user: response.user || null };
    } catch (error) {
      // Handle network errors
      if (error.message.includes('fetch') || error.message.includes('Failed to fetch')) {
        throw new Error('Cannot connect to server. Please make sure the backend is running on http://localhost:5000');
      }
      throw new Error(error.message || 'Sign up failed. Please try again.');
    }
  },

  /**
   * Logout user
   */
  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  /**
   * Get stored token
   * @returns {string|null}
   */
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  /**
   * Get stored user
   * @returns {object|null}
   */
  getUser() {
    const userStr = localStorage.getItem(USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  },

  /**
   * Check if user is authenticated
   * @returns {boolean}
   */
  isAuthenticated() {
    return !!this.getToken();
  },
};
