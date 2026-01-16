/**
 * ExpenseChart Component - Displays expense data as a pie chart
 */

import { motion } from 'framer-motion';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import PropTypes from 'prop-types';
import { CHART_COLORS, CHART_CONFIG, ANIMATION_DURATION } from '../constants';
import { formatCurrency } from '../utils/formatters';

/**
 * ExpenseChart component
 * @param {Object} props - Component props
 * @param {Array} props.data - Expense data array
 * @param {string} props.title - Chart title
 * @param {string} props.period - Time period label
 * @param {number} props.total - Total expenses
 */
function ExpenseChart({ data = [], title = 'Expenses', period = 'ALL TIME', total = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: ANIMATION_DURATION.NORMAL }}
      className="chart-card"
    >
      <h2 className="chart-title">{title}</h2>

      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={CHART_CONFIG.INNER_RADIUS}
              outerRadius={CHART_CONFIG.OUTER_RADIUS}
              paddingAngle={CHART_CONFIG.PADDING_ANGLE}
              startAngle={CHART_CONFIG.START_ANGLE}
              endAngle={CHART_CONFIG.END_ANGLE}
              animationDuration={CHART_CONFIG.ANIMATION_DURATION}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Text */}
        <div className="chart-center">
          <span className="chart-period">{period}</span>
          <p className="chart-label">Total Expenses</p>
          <h3 className="chart-total">{formatCurrency(total)}</h3>
        </div>
      </div>
    </motion.div>
  );
}

ExpenseChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ),
  title: PropTypes.string,
  period: PropTypes.string,
  total: PropTypes.number,
};

export default ExpenseChart;

