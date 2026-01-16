import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import Dashboard from './components/Dashboard';
import FinancialSnapshot from './pages/FinancialSnapshot';
import FinancialTwinPage from './pages/FinancialTwinPage';
import BurnRatePage from './pages/BurnRatePage';
import FinancialAutopsyPage from './pages/FinancialAutopsyPage';
import './App.css';

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/financial-snapshot" element={<FinancialSnapshot />} />
            <Route path="/financial-twin" element={<FinancialTwinPage />} />
            <Route path="/burn-rate" element={<BurnRatePage />} />
            <Route path="/financial-autopsy" element={<FinancialAutopsyPage />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
