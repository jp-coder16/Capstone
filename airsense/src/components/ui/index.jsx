import React from 'react'

// ─── Card ──────────────────────────────────────────────
export const Card = ({ children, style = {}, className = '', hover = false, glowing = false }) => (
  <div
    className={className}
    style={{
      background: 'var(--bg-card)',
      border: `1px solid ${glowing ? 'var(--border-green)' : 'var(--border-subtle)'}`,
      borderRadius: 'var(--radius-lg)',
      padding: 24,
      boxShadow: glowing ? 'var(--shadow-green)' : 'var(--shadow-card)',
      transition: 'var(--transition)',
      ...style
    }}
    onMouseEnter={hover ? e => {
      e.currentTarget.style.borderColor = 'var(--border-green)'
      e.currentTarget.style.transform = 'translateY(-2px)'
    } : undefined}
    onMouseLeave={hover ? e => {
      e.currentTarget.style.borderColor = 'var(--border-subtle)'
      e.currentTarget.style.transform = 'translateY(0)'
    } : undefined}
  >
    {children}
  </div>
)

// ─── Badge ─────────────────────────────────────────────
export const Badge = ({ children, color = 'var(--green-400)', bg, style = {} }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 4,
    padding: '3px 10px',
    borderRadius: 'var(--radius-full)',
    fontSize: 12, fontWeight: 600,
    color,
    background: bg || `${color}18`,
    border: `1px solid ${color}40`,
    ...style
  }}>
    {children}
  </span>
)

// ─── Button ────────────────────────────────────────────
export const Button = ({
  children, onClick, variant = 'primary',
  size = 'md', disabled = false, loading = false,
  fullWidth = false, style = {}, type = 'button', icon
}) => {
  const sizes = { sm: '7px 14px', md: '10px 20px', lg: '13px 28px' }
  const fontSizes = { sm: 13, md: 14, lg: 16 }

  const variants = {
    primary: {
      background: 'var(--green-500)', color: '#080c0a',
      border: 'none', fontWeight: 600
    },
    outline: {
      background: 'transparent', color: 'var(--text-primary)',
      border: '1px solid var(--border-subtle)'
    },
    ghost: {
      background: 'transparent', color: 'var(--text-secondary)',
      border: 'none'
    },
    danger: {
      background: 'rgba(239,68,68,0.12)', color: '#ef4444',
      border: '1px solid rgba(239,68,68,0.3)'
    },
    green_outline: {
      background: 'var(--green-glow)', color: 'var(--green-400)',
      border: '1px solid var(--border-green)', fontWeight: 500
    }
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        gap: 8,
        padding: sizes[size],
        borderRadius: 'var(--radius-full)',
        fontSize: fontSizes[size],
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'all 0.2s ease',
        width: fullWidth ? '100%' : 'auto',
        fontFamily: 'var(--font-body)',
        ...variants[variant],
        ...style
      }}
      onMouseEnter={!disabled ? e => {
        if (variant === 'primary') e.currentTarget.style.background = 'var(--green-400)'
        else if (variant === 'outline') e.currentTarget.style.borderColor = 'var(--border-green)'
      } : undefined}
      onMouseLeave={!disabled ? e => {
        if (variant === 'primary') e.currentTarget.style.background = 'var(--green-500)'
        else if (variant === 'outline') e.currentTarget.style.borderColor = 'var(--border-subtle)'
      } : undefined}
    >
      {loading ? (
        <span style={{
          width: 14, height: 14, border: '2px solid rgba(0,0,0,0.3)',
          borderTopColor: variant === 'primary' ? '#080c0a' : 'var(--text-primary)',
          borderRadius: '50%', animation: 'spin 0.7s linear infinite'
        }} />
      ) : icon}
      {children}
    </button>
  )
}

// ─── Input ─────────────────────────────────────────────
export const Input = ({ label, type = 'text', value, onChange, placeholder, error, icon, style = {}, ...props }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
    {label && <label style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>{label}</label>}
    <div style={{ position: 'relative' }}>
      {icon && (
        <div style={{
          position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
          color: 'var(--text-muted)', display: 'flex'
        }}>{icon}</div>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: '100%',
          background: 'var(--bg-input)',
          border: `1px solid ${error ? 'rgba(239,68,68,0.5)' : 'var(--border-subtle)'}`,
          borderRadius: 'var(--radius-md)',
          padding: `10px ${icon ? '36px' : '14px'}`,
          paddingLeft: icon ? 38 : 14,
          color: 'var(--text-primary)',
          fontSize: 14,
          outline: 'none',
          transition: 'var(--transition)'
        }}
        onFocus={e => e.target.style.borderColor = 'var(--border-green-strong)'}
        onBlur={e => e.target.style.borderColor = error ? 'rgba(239,68,68,0.5)' : 'var(--border-subtle)'}
        {...props}
      />
    </div>
    {error && <p style={{ color: '#ef4444', fontSize: 12 }}>{error}</p>}
  </div>
)

// ─── Stat tile ─────────────────────────────────────────
export const StatTile = ({ label, value, unit, icon, color = 'var(--green-400)', change, style = {} }) => (
  <div style={{
    background: 'var(--bg-card)',
    border: '1px solid var(--border-subtle)',
    borderRadius: 'var(--radius-md)',
    padding: '16px 18px',
    transition: 'var(--transition)',
    ...style
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
      <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {label}
      </span>
      {icon && (
        <div style={{ color, opacity: 0.7 }}>{icon}</div>
      )}
    </div>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
      <span style={{ fontSize: 26, fontWeight: 700, fontFamily: 'var(--font-display)', color }}>
        {value ?? '—'}
      </span>
      {unit && <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{unit}</span>}
    </div>
    {change !== undefined && (
      <div style={{
        fontSize: 12, marginTop: 6,
        color: change >= 0 ? '#ef4444' : 'var(--green-400)'
      }}>
        {change >= 0 ? '↑' : '↓'} {Math.abs(change)} vs yesterday
      </div>
    )}
  </div>
)

// ─── Section heading ───────────────────────────────────
export const SectionHeading = ({ title, subtitle, style = {} }) => (
  <div style={{ marginBottom: 24, ...style }}>
    <h2 style={{
      fontFamily: 'var(--font-display)',
      fontSize: 22, fontWeight: 700,
      color: 'var(--text-primary)'
    }}>{title}</h2>
    {subtitle && <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginTop: 4 }}>{subtitle}</p>}
  </div>
)

// ─── Spinner ───────────────────────────────────────────
export const Spinner = ({ size = 32, color = 'var(--green-500)' }) => (
  <div style={{
    width: size, height: size,
    border: `3px solid var(--border-subtle)`,
    borderTopColor: color,
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite'
  }} />
)

// ─── Divider ───────────────────────────────────────────
export const Divider = ({ style = {} }) => (
  <div style={{ height: 1, background: 'var(--border-subtle)', ...style }} />
)

// ─── Empty state ───────────────────────────────────────
export const EmptyState = ({ icon, title, description, action }) => (
  <div style={{
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    padding: '48px 24px', textAlign: 'center'
  }}>
    <div style={{ fontSize: 48, marginBottom: 16 }}>{icon || '📭'}</div>
    <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: 8 }}>{title}</h3>
    {description && <p style={{ color: 'var(--text-secondary)', fontSize: 14, maxWidth: 300 }}>{description}</p>}
    {action && <div style={{ marginTop: 20 }}>{action}</div>}
  </div>
)
