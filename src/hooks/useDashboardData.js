/**
 * Custom hook for dashboard data
 * Currently uses mock data - ready for backend integration
 */

import { useState, useEffect } from 'react';
import {
  MOCK_EXPENSE_DATA,
  MOCK_FINANCIAL_STATS,
  MOCK_DASHBOARD_DATA,
  TRANSACTIONS,
  delay,
} from '../data/mockData';
import { buildFinancialTwin } from '../intelligence/financialTwin';
import { calculateBurnRate } from '../intelligence/burnRate';
import { runFinancialAutopsy } from '../intelligence/autopsyEngine';

// Uncomment when ready to use backend:
// import { getDashboardData, getExpenseData, getFinancialStats } from '../services/dashboardService';

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Simulate API delay for realistic loading state
        await delay(800);

        // Using mock data (no backend connection)
        // When ready to connect backend, uncomment the code below and remove mock data
        setData({
          stats: MOCK_DASHBOARD_DATA,
          expenses: MOCK_EXPENSE_DATA,
          financialStats: MOCK_FINANCIAL_STATS,
        });

        // Transform transactions to expected format and compute intelligence metrics
        const transactions = TRANSACTIONS.map(t => ({
          id: t.id,
          amount: t.isPositive ? t.amount : -Math.abs(t.amount),
          merchant: t.name,
          date: t.date,
        }));

        const financialTwin = buildFinancialTwin(transactions, income, savings);
        const burnRate = calculateBurnRate(financialTwin.monthlyExpense, savings);
        const autopsyReport = runFinancialAutopsy(transactions);

        setData(prevData => ({
          ...prevData,
          financialTwin,
          burnRate,
          autopsyReport,
          savings,
        }));

        /* 
        // Backend integration (uncomment when ready):
        const [dashboardData, expenseData, financialStats] = await Promise.all([
          getDashboardData().catch(() => null),
          getExpenseData().catch(() => null),
          getFinancialStats().catch(() => null),
        ]);

        setData({
          stats: dashboardData || MOCK_DASHBOARD_DATA,
          expenses: expenseData || MOCK_EXPENSE_DATA,
          financialStats: financialStats || MOCK_FINANCIAL_STATS,
        });
        */
      } catch (err) {
        setError(err.message || 'Failed to load dashboard data');
        console.error('Error in useDashboardData:', err);
        // Fallback to mock data on error
        setData({
          stats: MOCK_DASHBOARD_DATA,
          expenses: MOCK_EXPENSE_DATA,
          financialStats: MOCK_FINANCIAL_STATS,
        });

        // Transform transactions to expected format and compute intelligence metrics
        const transactions = TRANSACTIONS.map(t => ({
          id: t.id,
          amount: t.isPositive ? t.amount : -Math.abs(t.amount),
          merchant: t.name,
          date: t.date,
        }));

        const financialTwin = buildFinancialTwin(transactions, income, savings);
        const burnRate = calculateBurnRate(financialTwin.monthlyExpense, savings);
        const autopsyReport = runFinancialAutopsy(transactions);

        setData(prevData => ({
          ...prevData,
          financialTwin,
          burnRate,
          autopsyReport,
          savings,
        }));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const refetch = async () => {
    setLoading(true);
    await delay(500);
    setData({
      stats: MOCK_DASHBOARD_DATA,
      expenses: MOCK_EXPENSE_DATA,
      financialStats: MOCK_FINANCIAL_STATS,
    });

    // Transform transactions to expected format and compute intelligence metrics
    const transactions = TRANSACTIONS.map(t => ({
      id: t.id,
      amount: t.isPositive ? t.amount : -Math.abs(t.amount),
      merchant: t.name,
      date: t.date,
    }));

    const financialTwin = buildFinancialTwin(transactions, income, savings);
    const burnRate = calculateBurnRate(financialTwin.monthlyExpense, savings);
    const autopsyReport = runFinancialAutopsy(transactions);

    setData(prevData => ({
      ...prevData,
      financialTwin,
      burnRate,
      autopsyReport,
    }));
    setLoading(false);
  };

  return { data, loading, error, refetch };
};
