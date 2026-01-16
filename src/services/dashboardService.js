/**
 * Dashboard API Service
 */

import { apiClient } from '../utils/api';
import { API_CONFIG } from '../constants';

/**
 * Fetch dashboard data
 * @returns {Promise<Object>} Dashboard data
 */
export const getDashboardData = async () => {
  try {
    const data = await apiClient.get(API_CONFIG.ENDPOINTS.DASHBOARD);
    return data;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
};

/**
 * Fetch expense statistics
 * @returns {Promise<Array>} Expense data
 */
export const getExpenseData = async () => {
  try {
    const data = await apiClient.get(API_CONFIG.ENDPOINTS.EXPENSES);
    return data;
  } catch (error) {
    console.error('Error fetching expense data:', error);
    throw error;
  }
};

/**
 * Fetch financial statistics
 * @returns {Promise<Object>} Financial stats
 */
export const getFinancialStats = async () => {
  try {
    const data = await apiClient.get(API_CONFIG.ENDPOINTS.STATS);
    return data;
  } catch (error) {
    console.error('Error fetching financial stats:', error);
    throw error;
  }
};

