/**
 * Main App Component
 */

import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import Dashboard from './components/Dashboard';
import FinancialTwinPage from './pages/FinancialTwinPage';
import BurnRatePage from './pages/BurnRatePage';
import FinancialAutopsyPage from './pages/FinancialAutopsyPage';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/financial-twin" element={<FinancialTwinPage />} />
            <Route path="/burn-rate" element={<BurnRatePage />} />
            <Route path="/financial-autopsy" element={<FinancialAutopsyPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
