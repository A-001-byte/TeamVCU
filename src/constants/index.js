
/**
 * Application Constants
 */

import { ENV } from '../config/env';

// API Configuration
export const API_CONFIG = {
  BASE_URL: ENV.API_BASE_URL,
  TIMEOUT: 10000,
  ENDPOINTS: {
    DASHBOARD: '/dashboard',
    EXPENSES: '/expenses',
    STATS: '/stats',
    TRANSACTIONS: '/transactions',
    TAX_COMPLIANCE: '/tax-compliance',
    CAs: '/cas',
  },
};

// Chart Colors
export const CHART_COLORS = [
  '#5BC0EB',
  '#9D4EDD',
  '#495057',
  '#FF6B6B',
  '#51CF66',
];

// Animation Durations
export const ANIMATION_DURATION = {
  FAST: 0.3,
  NORMAL: 0.6,
  SLOW: 1.2,
};

// Currency Configuration
export const CURRENCY = {
  SYMBOL: '₹',
  LOCALE: 'en-IN',
};

// Chart Configuration
export const CHART_CONFIG = {
  INNER_RADIUS: 80,
  OUTER_RADIUS: 110,
  PADDING_ANGLE: 4,
  START_ANGLE: 90,
  END_ANGLE: -270,
  ANIMATION_DURATION: 1200,
};

