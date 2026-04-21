import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function ProtectedRoute({ children, adminOnly = false }) {
  // ✅ FIX 1: We only pull 'user' and 'loading' from the context now
  const { user, loading } = useAuth()

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: 40, height: 40, border: '3px solid var(--border-subtle)',
          borderTopColor: 'var(--green-500)', borderRadius: '50%',
          animation: 'spin 1s linear infinite', margin: '0 auto 12px'
        }} />
        <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Loading...</p>
      </div>
    </div>
  )

  // ✅ FIX 2: Check if there is NO user, then kick them back to login
  if (!user) return <Navigate to="/login" replace />
  
  if (adminOnly && user?.role !== 'admin') return <Navigate to="/dashboard" replace />

  return children
}