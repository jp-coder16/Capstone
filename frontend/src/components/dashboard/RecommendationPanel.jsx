import React from 'react'
import { getRiskLevel } from '../../utils/aqiUtils'

const icons = {
  outdoor: '🌿',
  mask: '😷',
  exercise: '🏃',
  ventilation: '🪟',
}

export default function RecommendationPanel({ aqi = 0, recommendations, userType = 'individual' }) {
  const risk = getRiskLevel(aqi)

  // Fallback defaults just in case the ML server goes offline
  const defaultRecs = {
    outdoor: 'Safe for outdoor activities',
    mask: 'No mask required',
    exercise: 'Normal exercise okay',
    ventilation: 'Open windows for fresh air',
    tips: ['Air quality is good — enjoy outdoor activities']
  }

  // The 'recommendations' object now comes perfectly formatted directly from our Python ML model!
  const recs = recommendations || defaultRecs
  const tips = recs.tips || defaultRecs.tips
  const institutionMode = userType === 'institution'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Risk level banner */}
      <div style={{
        padding: '14px 18px',
        background: `${risk.color}12`,
        border: `1px solid ${risk.color}30`,
        borderRadius: 'var(--radius-md)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 2 }}>Current Health Risk Level</div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: risk.color, fontSize: 18 }}>
            {risk.icon} {risk.label}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>AQI</div>
          <div style={{ fontSize: 28, fontWeight: 800, fontFamily: 'var(--font-display)', color: risk.color }}>
            {aqi}
          </div>
        </div>
      </div>

      {/* Institution Mode Protocol Banner */}
      {institutionMode && (
        <div style={{
          padding: '12px 16px',
          background: 'rgba(168,85,247,0.08)',
          border: '1px solid rgba(168,85,247,0.2)',
          borderRadius: 'var(--radius-md)',
          fontSize: 13
        }}>
          <div style={{ fontWeight: 600, color: '#c084fc', marginBottom: 6 }}>🏫 Institution Protocol Active</div>
          <div style={{ display: 'flex', gap: 12 }}>
            <span style={{ color: 'var(--text-secondary)' }}>
              Outdoor Sports:{' '}
              <strong style={{ color: aqi <= 100 ? 'var(--aqi-good)' : aqi <= 150 ? '#eab308' : '#ef4444' }}>
                {aqi <= 100 ? 'Allowed' : aqi <= 150 ? 'Restricted' : 'CANCELLED'}
              </strong>
            </span>
            <span style={{ color: 'var(--text-secondary)' }}>
              Assembly:{' '}
              <strong style={{ color: aqi <= 100 ? 'var(--aqi-good)' : aqi <= 200 ? '#eab308' : '#ef4444' }}>
                {aqi <= 100 ? 'Allowed' : aqi <= 200 ? 'Move Indoors' : 'CANCELLED'}
              </strong>
            </span>
          </div>
        </div>
      )}

      {/* Dynamic 4-Grid Cards driven by ML Model */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {Object.entries(icons).map(([key, icon]) => (
          <div key={key} style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '12px 14px'
          }}>
            <div style={{ fontSize: 18, marginBottom: 6 }}>{icon}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 3 }}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              {/* Pulls directly from the Python ML dictionary */}
              {recs[key] || defaultRecs[key]} 
            </div>
          </div>
        ))}
      </div>

      {/* Dynamic Advisory Tips */}
      <div>
        <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          AI Health Advisory
        </div>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
          {tips.map((tip, i) => (
            <li key={i} style={{
              display: 'flex', gap: 8, fontSize: 13,
              color: 'var(--text-secondary)', padding: '6px 0',
              borderBottom: i < tips.length - 1 ? '1px solid var(--border-subtle)' : 'none'
            }}>
              <span style={{ color: 'var(--green-400)', flexShrink: 0, marginTop: 1 }}>→</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}