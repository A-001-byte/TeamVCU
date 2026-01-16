/**
 * Mock Data for Dashboard
 * This file contains sample data for development without backend
 */

export const MOCK_EXPENSE_DATA = [
  { name: 'Food', value: 30 },
  { name: 'Travel', value: 22 },
  { name: 'Bills', value: 18 },
  { name: 'Shopping', value: 15 },
  { name: 'Others', value: 15 },
];

export const MOCK_FINANCIAL_STATS = {
  totalBalance: 342800,
  monthlySpend: 24350,
  savings: 58200,
  creditScore: 782,
};

export const MOCK_DASHBOARD_DATA = {
  totalExpenses: 20210230,
  monthlyIncome: 50000,
  monthlyExpenses: 24350,
  savingsRate: 51.3,
};

/**
 * Simulate API delay
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise}
 */
export const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

