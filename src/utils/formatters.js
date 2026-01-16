/**
 * Utility functions for formatting data
 */

import { CURRENCY } from '../constants';

/**
 * Format number as currency
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency symbol (default: ₹)
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currency = CURRENCY.SYMBOL) => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return `${currency}0`;
  }

  return new Intl.NumberFormat(CURRENCY.LOCALE, {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount).replace('INR', currency);
};

/**
 * Format number with commas
 * @param {number} num - Number to format
 * @returns {string} Formatted number string
 */
export const formatNumber = (num) => {
  if (num === null || num === undefined || isNaN(num)) {
    return '0';
  }
  return new Intl.NumberFormat(CURRENCY.LOCALE).format(num);
};

/**
 * Calculate percentage
 * @param {number} value - Current value
 * @param {number} total - Total value
 * @returns {number} Percentage
 */
export const calculatePercentage = (value, total) => {
  if (!total || total === 0) return 0;
  return Math.round((value / total) * 100);
};

