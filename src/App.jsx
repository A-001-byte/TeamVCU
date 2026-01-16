/**
 * Main App Component
 */

import { Suspense } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <Dashboard />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
