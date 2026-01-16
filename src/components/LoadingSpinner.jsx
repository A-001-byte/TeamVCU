/**
 * LoadingSpinner Component
 */

import { motion } from 'framer-motion';

function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <div className="loading-container">
      <motion.div
        className="loading-spinner"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
      <p className="loading-message">{message}</p>
    </div>
  );
}

export default LoadingSpinner;

