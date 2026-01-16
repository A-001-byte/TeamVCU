/**
 * ErrorMessage Component
 */

import PropTypes from 'prop-types';

function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-message">
      <div className="error-message-content">
        <p className="error-text">{message || 'An error occurred. Please try again.'}</p>
        {onRetry && (
          <button onClick={onRetry} className="error-retry-button">
            Retry
          </button>
        )}
      </div>
    </div>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string,
  onRetry: PropTypes.func,
};

export default ErrorMessage;

