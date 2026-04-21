import React, { useState } from 'react'
import { getMockAQIData } from '../services/api'
import { getAQICategory } from '../utils/aqiUtils'
import { Card, SectionHeading } from '../components/ui'
import { AQIAreaChart, PM25BarChart } from '../components/charts/AQICharts'

// Generate more history data
const generateHistory = () => {
  const data = []
  for (let i = 29; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000)
    const aqi = Math.floor(40 + Math.random() * 140)
    data.push({
      date: d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
      fullDate: d.toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }),
      aqi,
      pm25: Math.floor(aqi * 0.3 + Math.random() * 10),
      pm10: Math.floor(aqi * 0.5 + Math.random() * 15),
      no2: Math.floor(20 + Math.random() * 40),
      category: getAQICategory(aqi).label
    })
  }
  return data
}

const history30 = generateHistory()

export default function HistoryPage() {
  const [range, setRange] = useState(7)
  const [search, setSearch] = useState('')
  const filtered = history30.slice(-(range)).filter(r =>
    !search || r.category.toLowerCase().includes(search.toLowerCase()) || r.aqi.toString().includes(search)
  )

  const avg = Math.round(filtered.reduce((s, r) => s + r.aqi, 0) / (filtered.length || 1))
  const max = Math.max(...filtered.map(r => r.aqi))
  const min = Math.min(...filtered.map(r => r.aqi))
  const avgCat = getAQICategory(avg)

  return (
    <div style={{ paddingTop: 64, minHeight: '100vh' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, marginBottom: 6 }}>
            AQI History
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Historical air quality data and trends</p>
        </div>

        {/* Range selector */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          {[7, 14, 30].map(r => (
            <button
              key={r}
              onClick={() => setRange(r)}
              style={{
                padding: '7px 18px', borderRadius: 'var(--radius-full)',
                background: range === r ? 'var(--green-glow)' : 'var(--bg-card)',
                border: `1px solid ${range === r ? 'var(--border-green-strong)' : 'var(--border-subtle)'}`,
                color: range === r ? 'var(--green-400)' : 'var(--text-secondary)',
                fontSize: 13, cursor: 'pointer', fontWeight: range === r ? 600 : 400
              }}
            >
              {r} Days
            </button>
          ))}
        </div>

        {/* Stats summary */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
          {[
            { label: 'Average AQI', value: avg, color: avgCat.color },
            { label: 'Max AQI', value: max, color: getAQICategory(max).color },
            { label: 'Min AQI', value: min, color: getAQICategory(min).color },
            { label: 'Days Tracked', value: filtered.length, color: 'var(--text-secondary)' }
          ].map((s, i) => (
            <div key={i} style={{
              background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)', padding: '16px'
            }}>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>{s.label}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
          <Card>
            <SectionHeading title={`AQI Trend — Last ${range} Days`} />
            <AQIAreaChart data={filtered} />
          </Card>
          <Card>
            <SectionHeading title="PM2.5 Readings" />
            <PM25BarChart data={filtered} />
          </Card>
        </div>

        {/* Data table */}
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <SectionHeading title="Detailed Records" style={{ margin: 0 }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Filter by category or AQI..."
              style={{
                background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-full)', padding: '7px 14px',
                color: 'var(--text-primary)', fontSize: 13, outline: 'none', width: 220
              }}
              onFocus={e => e.target.style.borderColor = 'var(--border-green)'}
              onBlur={e => e.target.style.borderColor = 'var(--border-subtle)'}
            />
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  {['Date', 'AQI', 'Category', 'PM2.5', 'PM10', 'NO₂'].map(h => (
                    <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, i) => {
                  const c = getAQICategory(row.aqi)
                  return (
                    <tr
                      key={i}
                      style={{ borderBottom: '1px solid var(--border-subtle)', transition: 'var(--transition)' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-card-hover)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <td style={{ padding: '11px 16px', color: 'var(--text-secondary)', fontSize: 13 }}>{row.fullDate || row.date}</td>
                      <td style={{ padding: '11px 16px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: c.color }}>{row.aqi}</td>
                      <td style={{ padding: '11px 16px' }}>
                        <span style={{ padding: '3px 10px', borderRadius: 'var(--radius-full)', background: c.bg, border: `1px solid ${c.border}`, color: c.color, fontSize: 12 }}>{c.label}</span>
                      </td>
                      <td style={{ padding: '11px 16px', color: 'var(--text-secondary)', fontSize: 13 }}>{row.pm25}</td>
                      <td style={{ padding: '11px 16px', color: 'var(--text-secondary)', fontSize: 13 }}>{row.pm10}</td>
                      <td style={{ padding: '11px 16px', color: 'var(--text-secondary)', fontSize: 13 }}>{row.no2}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}
