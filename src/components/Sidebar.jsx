/**
 * Sidebar Component - Categories list and calendar
 */
import { Link } from 'react-router-dom';
import { RECENT_TRANSACTIONS, CALENDAR_MARKED_DATES } from '../data/mockData';
import { formatCurrency } from '../utils/formatters';

function Sidebar() {
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const currentYear = currentDate.getFullYear();
  
  // Get first day of month and number of days
  // getDay() returns 0 (Sunday) to 6 (Saturday)
  // We need to convert to Monday (0) to Sunday (6)
  const firstDayOfMonth = new Date(currentYear, currentDate.getMonth(), 1).getDay();
  const firstDayMonday = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; // Convert Sunday (0) to 6, others -1
  
  const daysInMonth = new Date(currentYear, currentDate.getMonth() + 1, 0).getDate();
  const daysInPrevMonth = new Date(currentYear, currentDate.getMonth(), 0).getDate();
  
  // Generate calendar days
  const calendarDays = [];
  
  // Previous month days (to fill before first day of current month)
  for (let i = firstDayMonday - 1; i >= 0; i--) {
    calendarDays.push({ day: daysInPrevMonth - i, isCurrentMonth: false });
  }
  
  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({ 
      day: i, 
      isCurrentMonth: true,
      isMarked: CALENDAR_MARKED_DATES.includes(i)
    });
  }
  
  // Fill remaining days to complete 6 weeks (42 days)
  const remainingDays = 42 - calendarDays.length;
  for (let i = 1; i <= remainingDays; i++) {
    calendarDays.push({ day: i, isCurrentMonth: false });
  }

  const weekDays = ['Mon', 'Tues', 'Wed', 'Thus', 'Fri', 'Sat', 'Sun'];

  return (
    <aside className="sidebar">
      {/* Reports Section */}
      <div className="sidebar-section">
        <h3 className="sidebar-title">Reports</h3>
        <nav>
          <ul>
            <li>
              <Link to="/financial-snapshot">Financial Snapshot</Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Categories List */}
      <div className="sidebar-section">
        <h3 className="sidebar-title">Categories</h3>
        <div className="transactions-list">
          {RECENT_TRANSACTIONS.map((transaction, index) => (
            <div key={index} className="transaction-item">
              <div className="transaction-icon-wrapper">
                <span className="transaction-icon-text">{transaction.icon}</span>
              </div>
              <div className="transaction-info">
                <div className="transaction-name">{transaction.name}</div>
                <div className="transaction-date">{transaction.date}</div>
              </div>
              <div className="transaction-amount">{formatCurrency(transaction.amount)}</div>
            </div>
          ))}
        </div>
        <button className="add-new-button">
          <span className="plus-icon">+</span>
          Add New
        </button>
      </div>

      {/* Calendar */}
      <div className="sidebar-section">
        <div className="calendar-widget">
          <div className="calendar-header">
            <h3 className="calendar-month">{currentMonth} {currentYear}</h3>
          </div>
          <div className="calendar-weekdays">
            {weekDays.map((day, index) => (
              <div key={index} className="weekday">{day}</div>
            ))}
          </div>
          <div className="calendar-days">
            {calendarDays.map((date, index) => (
              <div
                key={index}
                className={`calendar-day ${!date.isCurrentMonth ? 'other-month' : ''} ${date.isMarked ? 'marked' : ''}`}
              >
                {date.day}
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
