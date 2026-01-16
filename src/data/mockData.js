/**
 * Mock Data for Dashboard
 * Frontend-only data matching the design
 */

// Monthly Expense Data for Bar Chart
export const MONTHLY_EXPENSE_DATA = [
  { month: 'Apr', amount: 2000 },
  { month: 'May', amount: 2500 },
  { month: 'Jun', amount: 3000 },
  { month: 'Jul', amount: 4500 },
  { month: 'Aug', amount: 3500 },
  { month: 'Sep', amount: 4000 },
  { month: 'Nov', amount: 3000 },
];

// Summary Cards Data
export const SUMMARY_DATA = {
  expenses: {
    amount: 24500,
    label: 'Expenses',
    color: '#ef4444',
    icon: '🛡️',
  },
  expenseRevenues: {
    amount: 10500,
    label: 'Expense & Revenues',
    color: '#3b82f6',
    icon: '$',
  },
  revenues: {
    amount: 14455,
    label: 'Revenues',
    color: '#10b981',
    icon: '$',
  },
};

// Budget Overview Data
export const BUDGET_DATA = {
  spent: 24500,
  monthlyLimit: 35000,
  remaining: 3000,
};

// Categories with Biggest Expense
export const EXPENSE_CATEGORIES = [
  { name: 'Shopping Cost', amount: 1200, icon: '🛒', color: '#ef4444' },
  { name: 'Clothes & Shoes', amount: 2500, icon: '👕', color: '#3b82f6' },
  { name: 'Canon Camera', amount: 3508, icon: '📷', color: '#10b981' },
  { name: 'Home Loan', amount: 3000, icon: '🏠', color: '#f97316' },
  { name: 'Birthday Gift', amount: 1200, icon: '🎁', color: '#14b8a6' },
  { name: 'Pickup Loan', amount: 4500, icon: '🚚', color: '#6b7280' },
];

// Recent Transactions/Categories
export const RECENT_TRANSACTIONS = [
  { name: 'Home Loan', date: '15 April', amount: 150.00, icon: '🏢', color: '#a855f7' },
  { name: 'Earphone', date: '25 April', amount: 250.00, icon: '🎧', color: '#f97316' },
  { name: 'Camera', date: '28 May', amount: 1550.00, icon: '📷', color: '#eab308' },
];

// Calendar Data (marked dates)
export const CALENDAR_MARKED_DATES = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27];
