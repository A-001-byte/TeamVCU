import { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import Dashboard from './components/Dashboard';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import FinancialSnapshot from './pages/FinancialSnapshot';
import FinancialTwinPage from './pages/FinancialTwinPage';
import BurnRatePage from './pages/BurnRatePage';
import FinancialAutopsyPage from './pages/FinancialAutopsyPage';
import TaxCompliance from './pages/TaxCompliance';
import FindCaPage from './pages/FindCaPage';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/financial-snapshot"
                element={
                  <ProtectedRoute>
                    <FinancialSnapshot />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/financial-twin"
                element={
                  <ProtectedRoute>
                    <FinancialTwinPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/burn-rate"
                element={
                  <ProtectedRoute>
                    <BurnRatePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/financial-autopsy"
                element={
                  <ProtectedRoute>
                    <FinancialAutopsyPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tax-compliance"
                element={
                  <ProtectedRoute>
                    <TaxCompliance />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/find-ca"
                element={
                  <ProtectedRoute>
                    <FindCaPage />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
