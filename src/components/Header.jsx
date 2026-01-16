/**
 * Header Component - Top navigation bar
 */

function Header() {
  return (
    <header className="app-header">
      <div className="header-left">
        <div className="logo">
          <div className="logo-icon">B</div>
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
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 2C6.48 2 3.5 4.98 3.5 8.5c0 1.29.4 2.48 1.08 3.46L2 17l5.04-2.58c.98.68 2.17 1.08 3.46 1.08 3.52 0 6.5-2.98 6.5-6.5S13.52 2 10 2zm0 11.5c-1.38 0-2.63-.56-3.54-1.47L5.5 12l.96-1.04C5.06 10.13 4.5 8.88 4.5 7.5 4.5 5.01 6.51 3 9 3s4.5 2.01 4.5 4.5S11.49 12 10 12z" fill="currentColor"/>
          </svg>
        </button>
        <div className="profile-avatar">
          <div className="avatar-initials">JD</div>
        </div>
      </div>
    </header>
  );
}

export default Header;
