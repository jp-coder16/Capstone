import React from 'react'
import { pollutantLabels, pollutantUnits, getAQICategory } from '../../utils/aqiUtils'

const pollutants = ['pm25', 'pm10', 'no2', 'o3', 'co', 'so2']

const PollutantBar = ({ name, value, maxVal, color }) => {
  const pct = Math.min((value / maxVal) * 100, 100)
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{pollutantLabels[name] || name}</span>
        <span style={{ fontSize: 13, fontWeight: 600, color }}>
          {value} <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 400 }}>{pollutantUnits[name]}</span>
        </span>
      </div>
      <div style={{ height: 5, background: 'var(--border-subtle)', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: `${pct}%`,
          background: color,
          borderRadius: 4,
          transition: 'width 1s ease',
          boxShadow: `0 0 8px ${color}60`
        }} />
      </div>
    </div>
  )
}

export default function PollutantsGrid({ data = {} }) {
  const maxVals = { pm25: 150, pm10: 250, no2: 200, o3: 150, co: 15, so2: 200 }

  const getColor = (name, val) => {
    const pct = val / maxVals[name]
    if (pct < 0.25) return 'var(--aqi-good)'
    if (pct < 0.5)  return 'var(--aqi-moderate)'
    if (pct < 0.75) return 'var(--aqi-unhealthy-sg)'
    return 'var(--aqi-unhealthy)'
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 24px' }}>
      {pollutants.map(key => (
        <PollutantBar
          key={key}
          name={key}
          value={data[key] ?? '—'}
          maxVal={maxVals[key]}
          color={typeof data[key] === 'number' ? getColor(key, data[key]) : 'var(--text-muted)'}
        />
      ))}
    </div>
  )
}
