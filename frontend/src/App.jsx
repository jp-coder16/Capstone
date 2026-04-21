import React from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/layout/Navbar'
import ProtectedRoute from './components/layout/ProtectedRoute'

import HomePage      from './pages/HomePage'
import LoginPage     from './pages/LoginPage'
import RegisterPage  from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import PredictPage   from './pages/PredictPage'
import HistoryPage   from './pages/HistoryPage'
import AdminPage     from './pages/AdminPage'
import NotFoundPage  from './pages/NotFoundPage'
import ProfilePage from './pages/ProfilePage'

function AppInner() {
  const location = useLocation()
  const noNavbar = ['/login', '/register'].includes(location.pathname)

  return (
    <>
      {!noNavbar && <Navbar />}
      <Routes>
        <Route path="/"          element={<HomePage />} />
        <Route path="/login"     element={<LoginPage />} />
        <Route path="/register"  element={<RegisterPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/profile" element={
  <ProtectedRoute>
    <ProfilePage />
  </ProtectedRoute>
} />
        <Route path="/predict"   element={<ProtectedRoute><PredictPage /></ProtectedRoute>} />
        <Route path="/history"   element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} />
        <Route path="/admin"     element={<ProtectedRoute adminOnly><AdminPage /></ProtectedRoute>} />
        <Route path="*"          element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppInner />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: 'var(--bg-card)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '12px',
              fontSize: '14px'
            },
            success: {
              iconTheme: { primary: '#22c55e', secondary: '#080c0a' }
            },
            error: {
              iconTheme: { primary: '#ef4444', secondary: '#080c0a' }
            }
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  )
}
