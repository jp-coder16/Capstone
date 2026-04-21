import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const WindIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/>
  </svg>
)

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const navLinks = isAuthenticated
    ? [
        { to: '/dashboard', label: 'Dashboard' },
        { to: '/predict', label: 'Predict' },
        { to: '/history', label: 'History' },
        ...(user?.role === 'admin' ? [{ to: '/admin', label: 'Admin' }] : []),
      ]
    : [
        { to: '/', label: 'Home' },
        { to: '/about', label: 'About' },
      ]

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      padding: '0 24px',
      background: scrolled
        ? 'rgba(8,12,10,0.92)'
        : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
      transition: 'all 0.3s ease',
      height: 64,
      display: 'flex', alignItems: 'center',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto', width: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 32, height: 32, background: 'var(--green-500)',
            borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#080c0a'
          }}>
            <WindIcon />
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18 }}>
            AirSense <span style={{ color: 'var(--green-400)' }}>AI</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {navLinks.map(({ to, label }) => (
            <Link key={to} to={to} style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              fontSize: 14,
              fontWeight: location.pathname === to ? 600 : 400,
              color: location.pathname === to ? 'var(--green-400)' : 'var(--text-secondary)',
              background: location.pathname === to ? 'var(--green-glow)' : 'transparent',
              transition: 'var(--transition)',
            }}
            onMouseEnter={e => { if (location.pathname !== to) e.target.style.color = 'var(--text-primary)' }}
            onMouseLeave={e => { if (location.pathname !== to) e.target.style.color = 'var(--text-secondary)' }}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Auth buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {isAuthenticated ? (
            <>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '6px 12px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-full)',
                fontSize: 13
              }}>
                <div style={{
                  width: 24, height: 24,
                  background: 'var(--green-600)',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 700, color: 'white'
                }}>
                  {user?.name?.[0]?.toUpperCase() || 'U'}
                </div>
                <span style={{ color: 'var(--text-secondary)' }}>{user?.name || 'User'}</span>
                {user?.role === 'admin' && (
                  <span style={{
                    fontSize: 10, background: 'var(--green-glow)',
                    color: 'var(--green-400)', padding: '2px 6px',
                    borderRadius: 4, border: '1px solid var(--border-green)'
                  }}>ADMIN</span>
                )}
              </div>
              <button onClick={handleLogout} style={{
                padding: '6px 14px', borderRadius: 'var(--radius-full)',
                background: 'transparent', border: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)', fontSize: 13, cursor: 'pointer',
                transition: 'var(--transition)'
              }}
              onMouseEnter={e => { e.target.style.borderColor = 'var(--border-green)'; e.target.style.color = 'var(--text-primary)' }}
              onMouseLeave={e => { e.target.style.borderColor = 'var(--border-subtle)'; e.target.style.color = 'var(--text-secondary)' }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={{
                padding: '7px 16px', borderRadius: 'var(--radius-full)',
                color: 'var(--text-secondary)', fontSize: 14,
                transition: 'var(--transition)'
              }}>
                Login
              </Link>
              <Link to="/register" style={{
                padding: '7px 18px', borderRadius: 'var(--radius-full)',
                background: 'var(--green-500)', color: '#080c0a',
                fontSize: 14, fontWeight: 600,
                transition: 'var(--transition)'
              }}>
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
