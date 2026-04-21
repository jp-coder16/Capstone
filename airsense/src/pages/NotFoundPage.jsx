import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      textAlign: 'center', padding: '24px'
    }}>
      <div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 120, fontWeight: 800, color: 'var(--border-subtle)', lineHeight: 1 }}>
          404
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, marginBottom: 12, marginTop: 8 }}>
          Page not found
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 32 }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" style={{
          padding: '12px 28px', borderRadius: 'var(--radius-full)',
          background: 'var(--green-500)', color: '#080c0a', fontWeight: 600
        }}>
          Go Home
        </Link>
      </div>
    </div>
  )
}
