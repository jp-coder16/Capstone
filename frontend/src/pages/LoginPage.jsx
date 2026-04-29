import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Input, Button } from '../components/ui'
import toast from 'react-hot-toast'

const EyeIcon = ({ show }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    {show
      ? <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>
      : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
    }
  </svg>
)

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const { login } = useAuth()
  const navigate = useNavigate()

  const validate = () => {
    const e = {}
    if (!email) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Enter a valid email'
    if (!password) e.password = 'Password is required'
    else if (password.length < 6) e.password = 'Minimum 6 characters'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    
    setLoading(true)
    try {
      // ✅ THE FIX: Wrap the email and password in curly braces { }
      await login({
        email: email,
        password: password
      })
      
      // ✅ Update toast since AuthContext handles the user state now
      toast.success('Welcome back!')
      navigate('/dashboard')
    } catch (err) {
      // ✅ Pulls the standardized error from our backend
      const msg = err.response?.data?.message || 'Login failed. Check credentials.'
      toast.error(msg)
      setErrors({ form: msg })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '80px 24px', position: 'relative'
    }}>
      {/* BG glow */}
      <div style={{
        position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)',
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{ width: '100%', maxWidth: 440 }}>
        {/* Header */}
        <div className="animate-fade-up" style={{ textAlign: 'center', marginBottom: 36 }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 24 }}>
            <div style={{
              width: 36, height: 36, background: 'var(--green-500)',
              borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#080c0a', fontSize: 18
            }}>🌬️</div>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18 }}>
              AirSense <span style={{ color: 'var(--green-400)' }}>AI</span>
            </span>
          </Link>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, marginBottom: 8 }}>
            Welcome back
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Sign in to your account</p>
        </div>

        {/* Card */}
        <div
          className="animate-fade-up delay-1"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-xl)',
            padding: 32,
            boxShadow: 'var(--shadow-card)'
          }}
        >
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              error={errors.email}
              icon={
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              }
            />

            <div>
              <Input
                label="Password"
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                error={errors.password}
                icon={
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                }
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                style={{
                  position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', color: 'var(--text-muted)',
                  cursor: 'pointer', display: 'none' // handled via css
                }}
              />
            </div>

            {errors.form && (
              <div style={{
                padding: '10px 14px', borderRadius: 'var(--radius-md)',
                background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
                color: '#ef4444', fontSize: 13
              }}>
                {errors.form}
              </div>
            )}

            <Button type="submit" loading={loading} fullWidth size="lg" style={{ marginTop: 4 }}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Divider */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0',
            color: 'var(--text-muted)', fontSize: 12
          }}>
            <div style={{ flex: 1, height: 1, background: 'var(--border-subtle)' }} />
            <span>or demo as</span>
            <div style={{ flex: 1, height: 1, background: 'var(--border-subtle)' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <button
              onClick={() => { setEmail('user@demo.com'); setPassword('demo123') }}
              style={{
                padding: '9px', borderRadius: 'var(--radius-md)',
                background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)', fontSize: 13, cursor: 'pointer',
                transition: 'var(--transition)'
              }}
            >👤 Common  User</button>
            <button
              onClick={() => { setEmail('admin@demo.com'); setPassword('admin123') }}
              style={{
                padding: '9px', borderRadius: 'var(--radius-md)',
                background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)', fontSize: 13, cursor: 'pointer',
                transition: 'var(--transition)'
              }}
            >🔧 Admin Here <Login></Login></button>
          </div>
        </div>

        <p className="animate-fade-up delay-2" style={{ textAlign: 'center', marginTop: 20, fontSize: 14, color: 'var(--text-muted)' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: 'var(--green-400)', fontWeight: 600 }}>Sign up free</Link>
        </p>
      </div>
    </div>
  )
}