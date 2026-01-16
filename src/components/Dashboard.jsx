/**
 * Dashboard Component - Main dashboard view
 */

import { motion } from 'framer-motion';
import { useDashboardData } from '../hooks/useDashboardData';
import { formatCurrency } from '../utils/formatters';
import StatCard from './StatCard';
import ExpenseChart from './ExpenseChart';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

export default function Dashboard() {
  const { data, loading, error } = useDashboardData();

  // Extract data from hook response
  const expenseData = data?.expenses || [];
  const stats = data?.financialStats || {};
  const totalExpenses = data?.stats?.totalExpenses || 0;

  if (loading) {
    return <LoadingSpinner message="Loading dashboard..." />;
  }

  if (error && !data?.stats) {
    return (
      <ErrorMessage
        message={error}
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="dashboard-container">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="dashboard-header"
      >
        <h1>Dashboard</h1>
        <p>Your financial overview</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <StatCard
          title="Total Balance"
          value={formatCurrency(stats.totalBalance || 0)}
        />
        <StatCard
          title="Monthly Spend"
          value={formatCurrency(stats.monthlySpend || 0)}
        />
        <StatCard
          title="Savings"
          value={formatCurrency(stats.savings || 0)}
        />
        <StatCard
          title="Credit Score"
          value={stats.creditScore || 0}
        />
      </div>

      {/* Expense Chart */}
      {expenseData.length > 0 && (
        <ExpenseChart
          data={expenseData}
          title="Expenses"
          period="ALL TIME"
          total={totalExpenses}
        />
      )}
    </div>
  );
}
