/**
 * HomeWallet Component
 */

function HomeWallet() {
  return (
    <div className="home-wallet-section">
      <div className="wallet-header">
        <div className="wallet-title">
          <div className="wallet-icon-wrapper">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" fill="currentColor"/>
            </svg>
          </div>
          <div>
            <h2>Home Wallet</h2>
            <p className="wallet-subtitle">Change default wallet</p>
          </div>
        </div>
        <div className="calendar-dropdown">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 2h-1V1c0-.55-.45-1-1-1s-1 .45-1 1v1H6V1c0-.55-.45-1-1-1S4 .45 4 1v1H3c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 13H3V7h12v8z" fill="currentColor"/>
          </svg>
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
