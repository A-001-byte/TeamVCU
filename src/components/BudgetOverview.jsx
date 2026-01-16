/**
 * BudgetOverview Component - Donut chart showing budget
 */

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { BUDGET_DATA } from '../data/mockData';
import { formatCurrency } from '../utils/formatters';

function BudgetOverview() {
  const { spent, monthlyLimit, remaining } = BUDGET_DATA;
  const percentage = (spent / monthlyLimit) * 100;
  
  const data = [
    { name: 'Spent', value: spent },
    { name: 'Remaining', value: remaining },
  ];

  const COLORS = ['#f97316', '#e5e7eb'];

  return (
    <div className="budget-overview-card">
      <h3 className="chart-title">Budget Overview</h3>
      <div className="budget-chart-wrapper">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="budget-center-text">
          <div className="budget-spent">{formatCurrency(spent)}</div>
          <div className="budget-label">Spent</div>
        </div>
      </div>
      <div className="budget-details">
        <div className="budget-detail-item">
          <span className="budget-detail-label">Monthly Limit</span>
          <span className="budget-detail-value">{formatCurrency(monthlyLimit)}</span>
        </div>
        <div className="budget-detail-item">
          <span className="budget-detail-label">Remaining</span>
          <span className="budget-detail-value">{formatCurrency(remaining)}</span>
        </div>
      </div>
    </div>
  );
}

export default BudgetOverview;

