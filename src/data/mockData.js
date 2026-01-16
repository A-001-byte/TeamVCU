/**
 * Mock Data for Dashboard
 * Frontend-only data matching the design
 */

// Chart Data for Line Chart
export const CHART_DATA = [
  { date: 'Nov 08', food: 420, shopping: 380 },
  { date: 'Nov 12', food: 520, shopping: 450 },
  { date: 'Nov 16', food: 380, shopping: 520 },
  { date: 'Nov 20', food: 460, shopping: 480 },
  { date: 'Nov 24', food: 520, shopping: 420 },
  { date: 'Nov 28', food: 580, shopping: 650 },
  { date: 'Dec 02', food: 740, shopping: 580 },
  { date: 'Dec 06', food: 680, shopping: 520 },
  { date: 'Dec 10', food: 520, shopping: 480 },
];

// Transactions Data
export const TRANSACTIONS = [
  { id: 1, name: 'Burger King', date: 'Dec 15, 2025', amount: 3197, category: 'food', isPositive: false },
  { id: 2, name: 'Arun Payment', date: 'Dec 14, 2025', amount: 20000, category: 'payment', isPositive: true },
  { id: 3, name: 'PVR Forum', date: 'Dec 14, 2025', amount: 2187, category: 'entertainment', isPositive: false },
  { id: 4, name: "McDonald's HSR", date: 'Dec 13, 2025', amount: 3303, category: 'food', isPositive: false },
];

// Stats Data
export const STATS_DATA = [
  { label: 'Total Balance', amount: 18046, trend: '+12.5%', isPositive: true, bgColor: 'emerald' },
  { label: 'Total Expenses', amount: 46240, trend: '-8.2%', isPositive: false, bgColor: 'rose' },
  { label: 'Total Saved', amount: 2376, trend: '+5.1%', isPositive: true, bgColor: 'blue' },
];

// Trust Indicators
export const TRUST_INDICATORS = [
  { text: 'Bank-grade Security', subtext: 'ISO 27001 Certified' },
  { text: '2M+ Happy Users', subtext: 'Across India' },
  { text: '4.8★ Rating', subtext: 'Google Play & App Store' },
];

// Monthly Expense Data for Bar Chart (keeping for compatibility)
export const MONTHLY_EXPENSE_DATA = [
  { month: 'Apr', amount: 2000 },
  { month: 'May', amount: 2500 },
  { month: 'Jun', amount: 3000 },
  { month: 'Jul', amount: 4500 },
  { month: 'Aug', amount: 3500 },
  { month: 'Sep', amount: 4000 },
  { month: 'Nov', amount: 3000 },
];

// Summary Cards Data (keeping for compatibility)
export const SUMMARY_DATA = {
  expenses: {
    amount: 24500,
    label: 'Expenses',
    color: '#dc2626',
    icon: 'EXP',
  },
  expenseRevenues: {
    amount: 10500,
    label: 'Expense & Revenues',
    color: '#2563eb',
    icon: 'E&R',
  },
  revenues: {
    amount: 14455,
    label: 'Revenues',
    color: '#059669',
    icon: 'REV',
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
  { name: 'Shopping Cost', amount: 1200, icon: 'SC', color: '#4b5563' },
  { name: 'Clothes & Shoes', amount: 2500, icon: 'CS', color: '#4b5563' },
  { name: 'Canon Camera', amount: 3508, icon: 'CC', color: '#4b5563' },
  { name: 'Home Loan', amount: 3000, icon: 'HL', color: '#4b5563' },
  { name: 'Birthday Gift', amount: 1200, icon: 'BG', color: '#4b5563' },
  { name: 'Pickup Loan', amount: 4500, icon: 'PL', color: '#4b5563' },
];

// Recent Transactions/Categories
export const RECENT_TRANSACTIONS = [
  { name: 'Home Loan', date: '15 April', amount: 150.00, icon: 'HL', color: '#4b5563' },
  { name: 'Earphone', date: '25 April', amount: 250.00, icon: 'EP', color: '#4b5563' },
  { name: 'Camera', date: '28 May', amount: 1550.00, icon: 'CM', color: '#4b5563' },
];

// Calendar Data (marked dates)
export const CALENDAR_MARKED_DATES = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27];

// Mock data for useDashboardData hook
export const MOCK_DASHBOARD_DATA = STATS_DATA;
export const MOCK_EXPENSE_DATA = MONTHLY_EXPENSE_DATA;
export const MOCK_FINANCIAL_STATS = {
  totalIncome: 50000,
  totalExpenses: 46240,
  netSavings: 3760,
};

// Utility function to simulate API delay
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));