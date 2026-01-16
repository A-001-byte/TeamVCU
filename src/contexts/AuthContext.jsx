/**
 * Authentication Context
 */

import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { supabase } from '../config/supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check Supabase session on mount with timeout
    const checkSession = async () => {
      let timeoutId;
      
      // Set a timeout to ensure loading always stops
      const timeoutPromise = new Promise((resolve) => {
        timeoutId = setTimeout(() => {
          resolve(null);
        }, 3000); // 3 second timeout
      });

      try {
        // Check if Supabase is configured
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
        
        if (supabaseUrl && supabaseKey && supabaseUrl.trim() && supabaseKey.trim()) {
          // Try Supabase session first with timeout
          const sessionPromise = authService.getSession();
          const session = await Promise.race([sessionPromise, timeoutPromise]);
          
          if (session && session.access_token) {
            const userData = await authService.getUserFromSupabase();
            if (userData) {
              setIsAuthenticated(true);
              setUser(userData);
              clearTimeout(timeoutId);
              setIsLoading(false);
              return;
            }
          }
        }
        
        // Fallback to localStorage if no Supabase session or Supabase not configured
        const token = authService.getToken();
        const storedUser = authService.getUser();
        if (token && storedUser) {
          setIsAuthenticated(true);
          setUser(storedUser);
        }
      } catch (error) {
        console.error('Error checking session:', error);
        // Fallback to localStorage on error
        const token = authService.getToken();
        const storedUser = authService.getUser();
        if (token && storedUser) {
          setIsAuthenticated(true);
          setUser(storedUser);
        }
      } finally {
        clearTimeout(timeoutId);
        setIsLoading(false);
      }
    };

    checkSession();

    // Listen for auth state changes from Supabase (only if configured)
    let subscription = null;
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (supabaseUrl && supabaseKey) {
        const { data } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            if (session?.access_token) {
              const userData = await authService.getUserFromSupabase();
              if (userData) {
                setIsAuthenticated(true);
                setUser(userData);
              }
            } else {
              setIsAuthenticated(false);
              setUser(null);
            }
            setIsLoading(false);
          }
        );
        subscription = data.subscription;
      }
    } catch (error) {
      console.error('Error setting up auth state listener:', error);
    }

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  const login = async (email, password) => {
    try {
      const { token, user: userData } = await authService.login(email, password);
      setIsAuthenticated(true);
      setUser(userData);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const signup = async (userData) => {
    try {
      const { token, user: newUser } = await authService.signup(userData);
      if (token) {
        setIsAuthenticated(true);
        setUser(newUser);
      }
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    await authService.logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = {
    isAuthenticated,
    user,
    isLoading,
    login,
    signup,
    logout,
    setIsAuthenticated,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
