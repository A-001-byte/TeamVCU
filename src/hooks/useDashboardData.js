/**
 * Custom hook for dashboard data
 * Fetches transactions from backend
 */

import { useState, useEffect, useCallback } from 'react';
import {
  MOCK_EXPENSE_DATA,
  MOCK_FINANCIAL_STATS,
  MOCK_DASHBOARD_DATA,
  delay,
} from '../data/mockData';
import { buildFinancialTwin } from '../intelligence/financialTwin';
import { calculateBurnRate } from '../intelligence/burnRate';
import { runFinancialAutopsy } from '../intelligence/autopsyEngine';
import { apiClient } from '../utils/api';

/**
 * Hook to fetch and manage dashboard data
 * @returns {Object} Dashboard data, loading state, and error
 */
export const useDashboardData = () => {
  const [data, setData] = useState({
    stats: null,
    expenses: null,
    financialStats: null,
    financialTwin: null,
    burnRate: null,
    autopsyReport: null,
    savings: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Constants
  const income = 50000;
  const savings = 60000;

  const fetchAndProcessTransactions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch transactions from backend
      const response = await apiClient.get('/transactions');
      const backendTransactions = response || [];
      
      console.log('Fetched transactions:', backendTransactions);

      // Transform backend transactions to expected format
      const transactions = backendTransactions.map(t => ({
        id: t.id || Math.random(),
        amount: t.txn_type?.toUpperCase() === 'DEBIT' ? -t.amount : t.amount,  // Negate debits for calculations
        txn_type: t.txn_type,
        merchant: t.merchant,
        category: t.category,
        date: t.date || new Date().toLocaleDateString(),
      }));
      
      console.log('Processed transactions:', transactions);

      // Calculate actual expenses from transactions
      const totalExpenses = transactions
        .filter(t => t.txn_type?.toUpperCase() === 'DEBIT')
        .reduce((sum, t) => sum + t.amount, 0);
      
      const totalIncome = transactions
        .filter(t => t.txn_type?.toUpperCase() === 'CREDIT')
        .reduce((sum, t) => sum + t.amount, 0);
      
      const actualBalance = totalIncome - totalExpenses;

      // Compute intelligence metrics
      const financialTwin = buildFinancialTwin(transactions, totalIncome || income, actualBalance || savings);
      const burnRate = calculateBurnRate(totalExpenses || financialTwin.monthlyExpense, actualBalance || savings);
      const autopsyReport = runFinancialAutopsy(transactions);

      setData({
        stats: MOCK_DASHBOARD_DATA,
        expenses: MOCK_EXPENSE_DATA,
        financialStats: MOCK_FINANCIAL_STATS,
        financialTwin,
        burnRate,
        autopsyReport,
        savings: actualBalance,
        transactions,
        totalExpenses,
        totalIncome,
      });
      console.log('Dashboard data updated with transactions', { totalExpenses, totalIncome, actualBalance, burnRate });
    } catch (err) {
      console.error('Error fetching transactions:', err);
      setError(err.message || 'Failed to load dashboard data');
      
      // Fallback to empty transactions
      setData(prevData => ({
        ...prevData,
        stats: MOCK_DASHBOARD_DATA,
        expenses: MOCK_EXPENSE_DATA,
        financialStats: MOCK_FINANCIAL_STATS,
        transactions: [],
      }));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAndProcessTransactions();
  }, [fetchAndProcessTransactions]);

  const refetch = async () => {
    await fetchAndProcessTransactions();
  };

  return { data, loading, error, refetch };
};
