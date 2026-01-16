/**
 * StatCard Component - Displays a single statistic card
 */

import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * StatCard component
 * @param {Object} props - Component props
 * @param {string} props.title - Card title
 * @param {string|number} props.value - Card value
 * @param {string} props.icon - Optional icon
 * @param {string} props.trend - Optional trend indicator
 */
function StatCard({ title, value, icon, trend }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="stat-card"
    >
      {icon && <div className="stat-card-icon">{icon}</div>}
      <p className="stat-card-title">{title}</p>
      <h3 className="stat-card-value">{value}</h3>
      {trend && <span className="stat-card-trend">{trend}</span>}
    </motion.div>
  );
}

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.node,
  trend: PropTypes.string,
};

export default StatCard;

