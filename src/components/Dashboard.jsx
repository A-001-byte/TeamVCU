/**
 * Dashboard Component - Main dashboard view matching the design
 */

import Header from './Header';
import HomeWallet from './HomeWallet';
import SummaryCards from './SummaryCards';
import MonthlyExpenseChart from './MonthlyExpenseChart';
import BudgetOverview from './BudgetOverview';
import ExpenseCategories from './ExpenseCategories';
import Sidebar from './Sidebar';

export default function Dashboard() {
  return (
    <div className="app-container">
      <Header />
      
      <div className="main-content">
        <div className="content-area">
          <HomeWallet />
          <SummaryCards />
          <MonthlyExpenseChart />
          
          <div className="bottom-section">
            <BudgetOverview />
            <ExpenseCategories />
          </div>
        </div>
        
        <Sidebar />
      </div>
    </div>
  );
}
