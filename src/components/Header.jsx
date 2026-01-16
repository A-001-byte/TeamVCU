/**
 * Header Component - Top navigation bar
 */

function Header() {
  return (
    <header className="app-header">
      <div className="header-left">
        <div className="logo">
          <div className="logo-icon">💰</div>
          <span className="logo-text">Budget</span>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search" className="search-input" />
        </div>
      </div>
      
      <nav className="header-nav">
        <a href="#" className="nav-link active">Overview</a>
        <a href="#" className="nav-link">Finance</a>
        <a href="#" className="nav-link">Calendar</a>
        <a href="#" className="nav-link">Events</a>
      </nav>
      
      <div className="header-right">
        <button className="icon-button">
          <span className="icon">🔔</span>
        </button>
        <div className="profile-avatar">
          <div className="avatar-image">👤</div>
        </div>
      </div>
    </header>
  );
}

export default Header;

