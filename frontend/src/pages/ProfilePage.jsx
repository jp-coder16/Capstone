import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Card, Button } from '../components/ui'
import toast from 'react-hot-toast'

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
    navigate('/login')
  }

  if (!user) return null

  const isInstitution = user.role === 'institution'

  return (
    <div style={{ paddingTop: 64, minHeight: '100vh' }}>
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '32px 24px' }}>
        
        {/* Back Button */}
        <Link to="/dashboard" style={{ 
          display: 'inline-flex', alignItems: 'center', gap: 6, 
          color: 'var(--text-muted)', marginBottom: 24, fontSize: 14, fontWeight: 500,
          textDecoration: 'none'
        }}>
          ← Back to Dashboard
        </Link>

        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, marginBottom: 6 }}>
            Account Profile
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manage your details and account settings</p>
        </div>

        <Card glowing>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 32, paddingBottom: 24, borderBottom: '1px solid var(--border-subtle)' }}>
            <div style={{
              width: 72, height: 72, borderRadius: '50%',
              background: isInstitution ? '#c084fc' : 'var(--green-500)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: isInstitution ? '#fff' : '#080c0a', fontSize: 28, fontWeight: 'bold',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
              {isInstitution ? '🏫' : (user.name?.[0]?.toUpperCase() || 'U')}
            </div>
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                {user.name}
              </h2>
              <div style={{ 
                display: 'inline-block', marginTop: 6, padding: '4px 10px', 
                borderRadius: 'var(--radius-full)', fontSize: 12, fontWeight: 600,
                background: isInstitution ? 'rgba(168,85,247,0.12)' : 'rgba(34,197,94,0.12)',
                color: isInstitution ? '#c084fc' : 'var(--green-400)', border: `1px solid ${isInstitution ? 'rgba(168,85,247,0.3)' : 'rgba(34,197,94,0.3)'}`
              }}>
                {isInstitution ? 'Institution Account' : 'Personal Account'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 32 }}>
            <div>
              <label style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email Address</label>
              <div style={{ fontSize: 15, color: 'var(--text-secondary)', marginTop: 4, padding: '12px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                {user.email}
              </div>
            </div>

            <div>
              <label style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Account ID</label>
              <div style={{ fontSize: 15, color: 'var(--text-secondary)', marginTop: 4, padding: '12px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', fontFamily: 'monospace' }}>
                {user.id || user._id}
              </div>
            </div>
          </div>

          <button 
            onClick={handleLogout}
            style={{
              width: '100%', padding: '12px', borderRadius: 'var(--radius-md)',
              background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444',
              border: '1px solid rgba(239, 68, 68, 0.3)', fontSize: 15, fontWeight: 600,
              cursor: 'pointer', transition: 'all 0.2s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#ef4444'
              e.currentTarget.style.color = '#fff'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'
              e.currentTarget.style.color = '#ef4444'
            }}
          >
            Log Out
          </button>

        </Card>
      </div>
    </div>
  )
}