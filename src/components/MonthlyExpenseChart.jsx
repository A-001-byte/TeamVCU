/**
 * MonthlyExpenseChart Component - Bar chart for monthly expenses
 */

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MONTHLY_EXPENSE_DATA } from '../data/mockData';

function MonthlyExpenseChart() {
  return (
    <div className="monthly-chart-card">
      <h3 className="chart-title">Monthly Expense</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={MONTHLY_EXPENSE_DATA}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="month" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6b7280', fontSize: 12 }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6b7280', fontSize: 12 }}
            tickFormatter={(value) => `${value / 1000}k`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '1px solid #e5e7eb',
              borderRadius: '8px'
            }}
          />
          <Bar 
            dataKey="amount" 
            fill="#3b82f6" 
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MonthlyExpenseChart;

