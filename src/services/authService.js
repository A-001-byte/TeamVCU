/**
 * Authentication Service - Supabase Integration
 */

import { supabase } from '../config/supabase';

const TOKEN_KEY = 'thinktwice_token';
const USER_KEY = 'thinktwice_user';

export const authService = {
  /**
   * Login user with Supabase
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<{token: string, user: object}>}
   */
  async login(email, password) {
    try {
      console.log('Starting login for:', email);
      
      // Create timeout promise (30 seconds)
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
          console.error('Login timeout - Supabase API not responding');
          reject(new Error('Login request timed out. Supabase may be unavailable. Please check your connection and try again.'));
        }, 30000);
      });

      // Sign in with Supabase with timeout
      console.log('Sending login request to Supabase...');
      const loginPromise = supabase.auth.signInWithPassword({
        email,
        password,
      });

      const { data, error } = await Promise.race([loginPromise, timeoutPromise]);

      if (error) {
        console.error('Login error from Supabase:', error);
        throw new Error(error.message || 'Login failed. Please check your credentials.');
      }
      
      console.log('Login successful');

      // Extract token and user from Supabase session
      const token = data.session?.access_token;
      const supabaseUser = data.user;

      if (!token || !supabaseUser) {
        throw new Error('Failed to get session data from Supabase');
      }

      // Format user data for our app
      const user = {
        id: supabaseUser.id,
        email: supabaseUser.email,
        name: supabaseUser.user_metadata?.name || supabaseUser.email?.split('@')[0] || 'User',
        role: supabaseUser.user_metadata?.role || 'user',
        monthlyIncome: supabaseUser.user_metadata?.monthly_income || null,
        incomeType: supabaseUser.user_metadata?.income_type || null,
      };

      // Store token and user in localStorage
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(user));

      return { token, user };
    } catch (error) {
      console.error('Login error:', error);
      throw new Error(error.message || 'Login failed. Please check your credentials.');
    }
  },

  /**
   * Sign up user with Supabase
   * @param {object} userData - User registration data
   * @returns {Promise<{token: string, user: object}>}
   */
  async signup(userData) {
    try {
      console.log('Starting signup for:', userData.email);
      
      // Create timeout promise (30 seconds)
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
          console.error('Signup timeout - Supabase API not responding');
          reject(new Error('Sign up request timed out. Supabase may be unavailable. Please check your connection and try again.'));
        }, 30000);
      });

      // Sign up with Supabase with timeout
      console.log('Sending signup request to Supabase...');
      const signupPromise = supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            name: userData.name,
            monthly_income: userData.monthly_income || userData.monthlyIncome,
            income_type: userData.income_type || userData.incomeType,
            role: 'user',
          },
        },
      });

      const { data, error } = await Promise.race([signupPromise, timeoutPromise]);

      if (error) {
        console.error('Signup error from Supabase:', error);
        throw new Error(error.message || 'Sign up failed. Please try again.');
      }
      
      console.log('Signup successful');

      // If session is available (email confirmation disabled), extract token
      if (data.session) {
        const token = data.session.access_token;
        const supabaseUser = data.user;

        if (token && supabaseUser) {
          // Format user data
          const user = {
            id: supabaseUser.id,
            email: supabaseUser.email,
            name: userData.name || supabaseUser.email?.split('@')[0] || 'User',
            role: 'user',
            monthlyIncome: userData.monthly_income || userData.monthlyIncome || null,
            incomeType: userData.income_type || userData.incomeType || null,
          };

          // Store token and user
          localStorage.setItem(TOKEN_KEY, token);
          localStorage.setItem(USER_KEY, JSON.stringify(user));

          return { token, user };
        }
      }

      // If email confirmation is required, return null token
      // User will need to confirm email before getting a session
      return { token: null, user: null };
    } catch (error) {
      throw new Error(error.message || 'Sign up failed. Please try again.');
    }
  },

  /**
   * Logout user from Supabase
   */
  async logout() {
    try {
      // Sign out from Supabase
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error signing out from Supabase:', error);
    } finally {
      // Clear local storage regardless
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
  },

  /**
   * Get stored token (synchronous for compatibility)
   * Token is synced from Supabase session to localStorage
   * @returns {string|null}
   */
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  /**
   * Get stored user (synchronous for compatibility)
   * @returns {object|null}
   */
  getUser() {
    const userStr = localStorage.getItem(USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  },

  /**
   * Get user from Supabase (async method)
   * @returns {Promise<object|null>}
   */
  async getUserFromSupabase() {
    try {
      // Get user from Supabase session
      const { data: { user: supabaseUser } } = await supabase.auth.getUser();
      
      if (supabaseUser) {
        // Format user data
        const user = {
          id: supabaseUser.id,
          email: supabaseUser.email,
          name: supabaseUser.user_metadata?.name || supabaseUser.email?.split('@')[0] || 'User',
          role: supabaseUser.user_metadata?.role || 'user',
          monthlyIncome: supabaseUser.user_metadata?.monthly_income || null,
          incomeType: supabaseUser.user_metadata?.income_type || null,
        };
        
        // Sync with localStorage
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        return user;
      }
      
      return null;
    } catch (error) {
      console.error('Error getting user from Supabase:', error);
      return null;
    }
  },

  /**
   * Check if user is authenticated via Supabase
   * @returns {Promise<boolean>}
   */
  async isAuthenticated() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      return !!session?.access_token;
    } catch (error) {
      console.error('Error checking authentication:', error);
      return !!localStorage.getItem(TOKEN_KEY);
    }
  },

  /**
   * Get current Supabase session
   * @returns {Promise<object|null>}
   */
  async getSession() {
    try {
      // Check if Supabase is properly configured
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseKey || !supabaseUrl.trim() || !supabaseKey.trim()) {
        return null;
      }
      
      // Add timeout to prevent hanging
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Session check timeout')), 2000);
      });
      
      const sessionPromise = supabase.auth.getSession().catch(err => {
        console.error('Supabase session error:', err);
        return { data: { session: null } };
      });
      
      const result = await Promise.race([sessionPromise, timeoutPromise]);
      
      if (result?.data?.session?.access_token) {
        // Sync token to localStorage
        localStorage.setItem(TOKEN_KEY, result.data.session.access_token);
        return result.data.session;
      }
      
      return null;
    } catch (error) {
      // Silently fail if timeout or error - fallback to localStorage
      return null;
    }
  },
};
