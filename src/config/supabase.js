/**
 * Supabase Client Configuration
 */

import { createClient } from '@supabase/supabase-js';
import { ENV } from './env';

// Supabase configuration
// Get these from your Supabase project settings: https://app.supabase.com
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = () => {
  return !!(SUPABASE_URL && SUPABASE_ANON_KEY && SUPABASE_URL.trim() && SUPABASE_ANON_KEY.trim());
};

if (!isSupabaseConfigured()) {
  console.warn('Supabase credentials not found. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file');
}

// Create Supabase client only if configured, otherwise use minimal config
export const supabase = createClient(
  SUPABASE_URL || 'https://placeholder.supabase.co',
  SUPABASE_ANON_KEY || 'plac',
  {
    auth: {
      persistSession: isSupabaseConfigured(),
      autoRefreshToken: isSupabaseConfigured(),
      detectSessionInUrl: isSupabaseConfigured(),
    },
  }
);

// Export for use in other files
export default supabase;
