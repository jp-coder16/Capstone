import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Input, Button } from '../components/ui'
import toast from 'react-hot-toast'

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', role: 'user' })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const { register } = useAuth()
  const navigate = useNavigate()

  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Full name is required'
    if (!form.email) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email address'
    if (!form.password) e.password = 'Password is required'
    else if (form.password.length < 6) e.password = 'Minimum 6 characters'
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    try {
      await register(form.name, form.email, form.password, form.role)
      toast.success('Account created! Welcome to AirSense AI.')
      navigate('/dashboard')
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed.'
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
      <div style={{
        position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)',
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{ width: '100%', maxWidth: 460 }}>
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
            Create your account
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Start monitoring air quality today</p>
        </div>

        <div
          className="animate-fade-up delay-1"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-xl)',
            padding: 32,
          }}
        >
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Input
              label="Full Name"
              value={form.name}
              onChange={set('name')}
              placeholder="Jayant Pachori"
              error={errors.name}
              icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
            />
            <Input
              label="Email"
              type="email"
              value={form.email}
              onChange={set('email')}
              placeholder="you@example.com"
              error={errors.email}
              icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>}
            />
            <Input
              label="Password"
              type="password"
              value={form.password}
              onChange={set('password')}
              placeholder="Min. 6 characters"
              error={errors.password}
              icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>}
            />
            <Input
              label="Confirm Password"
              type="password"
              value={form.confirmPassword}
              onChange={set('confirmPassword')}
              placeholder="Repeat password"
              error={errors.confirmPassword}
              icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>}
            />

            {/* Role select */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>Account Type</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {[
                  { value: 'user', label: '👤 Individual', desc: 'Personal monitoring' },
                  { value: 'institution', label: '🏛️ Institution', desc: 'School / Office' },
                ].map(opt => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setForm(p => ({ ...p, role: opt.value }))}
                    style={{
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-md)',
                      background: form.role === opt.value ? 'var(--green-glow)' : 'var(--bg-secondary)',
                      border: `1px solid ${form.role === opt.value ? 'var(--border-green-strong)' : 'var(--border-subtle)'}`,
                      color: form.role === opt.value ? 'var(--green-400)' : 'var(--text-secondary)',
                      cursor: 'pointer', textAlign: 'left', transition: 'var(--transition)'
                    }}
                  >
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{opt.label}</div>
                    <div style={{ fontSize: 11, marginTop: 2, opacity: 0.7 }}>{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {errors.form && (
              <div style={{
                padding: '10px 14px', borderRadius: 'var(--radius-md)',
                background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
                color: '#ef4444', fontSize: 13
              }}>{errors.form}</div>
            )}

            <Button type="submit" loading={loading} fullWidth size="lg" style={{ marginTop: 4 }}>
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>
        </div>

        <p className="animate-fade-up delay-2" style={{ textAlign: 'center', marginTop: 20, fontSize: 14, color: 'var(--text-muted)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--green-400)', fontWeight: 600 }}>Sign in</Link>
        </p>
      </div>
    </div>
  )
}
