/**
 * HomeWallet Component
 */

function HomeWallet() {
  return (
    <div className="home-wallet-section">
      <div className="wallet-header">
        <div className="wallet-title">
          <span className="wallet-icon">👛</span>
          <div>
            <h2>Home Wallet</h2>
            <p className="wallet-subtitle">Change default wallet</p>
          </div>
        </div>
        <div className="calendar-dropdown">
          <span className="calendar-icon">📅</span>
          <select className="date-select">
            <option>This Month</option>
            <option>Last Month</option>
            <option>This Year</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default HomeWallet;

