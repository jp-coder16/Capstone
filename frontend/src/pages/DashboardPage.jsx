import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { getMockAQIData, fetchDashboardData } from '../services/api'
import { getAQICategory } from '../utils/aqiUtils'
import AQIGauge from '../components/dashboard/AQIGauge'
import PollutantsGrid from '../components/dashboard/PollutantsGrid'
import RecommendationPanel from '../components/dashboard/RecommendationPanel'
import Chatbot from '../components/dashboard/Chatbot'
import { AQIAreaChart, PM25BarChart, ForecastChart } from '../components/charts/AQICharts'
import { Card, StatTile, SectionHeading, Badge, Spinner } from '../components/ui'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'; // Add this near the top

const TempIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/>
  </svg>
)
const HumIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
  </svg>
)
const WindIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/>
  </svg>
)

export default function DashboardPage() {
  const { user } = useAuth()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [tab, setTab] = useState('overview') 
  const [institutionMode, setInstitutionMode] = useState(false)

  const loadData = async (silent = false) => {
    if (!silent) setLoading(true)
    else setRefreshing(true)
    try {
      const res = await fetchDashboardData()
      if (res.data && res.data.data) {
        setData(res.data.data)
      } else {
        throw new Error("No data returned")
      }
    } catch (error) {
      console.warn("Using mock data because:", error.message)
      setData(getMockAQIData())
      if (!silent) toast.success('Loaded sample environment data')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    loadData()
    const interval = setInterval(() => loadData(true), 5 * 60 * 1000) 
    return () => clearInterval(interval)
  }, [])

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 64 }}>
      <div style={{ textAlign: 'center' }}>
        <Spinner size={48} />
        <p style={{ color: 'var(--text-muted)', marginTop: 16 }}>Fetching air quality data...</p>
      </div>
    </div>
  )

  const { current, history, forecast, recommendations } = data
  const cat = getAQICategory(current.aqi)
  const isInstitution = user?.role === 'institution' || institutionMode

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'pollutants', label: 'Pollutants' },
    { id: 'forecast', label: 'Forecast' },
    { id: 'history', label: '7-Day History' },
  ]

  return (
    <div style={{ paddingTop: 64, minHeight: '100vh' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px' }}>

        {/* Header bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: 28, flexWrap: 'wrap', gap: 12
        }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, marginBottom: 4 }}>
              {isInstitution ? '🏛️ Institution Dashboard' : '👤 Individual Dashboard'}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
              Real-time environmental monitoring
              {' '}· Last updated {new Date(current.updatedAt).toLocaleTimeString()}
              {refreshing && <span style={{ color: 'var(--green-400)', marginLeft: 8 }}>↻ Refreshing...</span>}
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            
            {/* ✅ NEW: DYNAMIC PROFILE BADGE (CLICKABLE) */}
            <Link to="/profile" style={{ textDecoration: 'none' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '6px 16px 6px 6px', 
                background: isInstitution ? 'rgba(168,85,247,0.08)' : 'rgba(34,197,94,0.08)',
                border: `1px solid ${isInstitution ? 'rgba(168,85,247,0.2)' : 'rgba(34,197,94,0.2)'}`,
                borderRadius: 'var(--radius-full)',
                marginRight: 8,
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                <div style={{
                  width: 34, height: 34, borderRadius: '50%',
                  background: isInstitution ? '#c084fc' : 'var(--green-500)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: isInstitution ? '#fff' : '#080c0a', fontSize: 16, fontWeight: 'bold',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                }}>
                  {isInstitution ? '🏫' : (user?.name?.[0]?.toUpperCase() || 'U')}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', paddingRight: 4 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                    {isInstitution ? (user?.institutionName || 'Demo Academy') : (user?.name || 'User')}
                  </span>
                  <span style={{ fontSize: 11, color: isInstitution ? '#c084fc' : 'var(--green-400)', fontWeight: 600 }}>
                    {isInstitution ? 'Institution Profile' : 'Personal Profile'}
                  </span>
                </div>
              </div>
            </Link>

            {/* Institution toggle */}
            <button
              onClick={() => setInstitutionMode(p => !p)}
              style={{
                padding: '8px 14px', borderRadius: 'var(--radius-full)',
                background: institutionMode ? 'rgba(168,85,247,0.12)' : 'var(--bg-card)',
                border: `1px solid ${institutionMode ? 'rgba(168,85,247,0.4)' : 'var(--border-subtle)'}`,
                color: institutionMode ? '#c084fc' : 'var(--text-secondary)',
                fontSize: 13, cursor: 'pointer', transition: 'var(--transition)'
              }}
            >
              🏫 {institutionMode ? 'Institution Mode ON' : 'School Mode'}
            </button>
            <button
              onClick={() => loadData(true)}
              style={{
                padding: '8px 14px', borderRadius: 'var(--radius-full)',
                background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)', fontSize: 13, cursor: 'pointer'
              }}
            >
              ↻ Refresh
            </button>
          </div>
        </div>

        {/* Top grid: Gauge + Quick stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 20, marginBottom: 20 }}>
          {/* AQI Gauge card */}
          <Card glowing style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: 8 }}>
              <div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Current AQI</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)' }}>{current.location}</div>
              </div>
              <Badge color={cat.color} bg={cat.bg}>{cat.label}</Badge>
            </div>
            <AQIGauge aqi={current.aqi} size={220} />
          </Card>

          {/* Right side grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* Weather + env stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
              <StatTile label="Temperature" value={current.temperature} unit="°C" icon={<TempIcon />} color="#f97316" />
              <StatTile label="Humidity" value={current.humidity} unit="%" icon={<HumIcon />} color="#38bdf8" />
              <StatTile label="PM2.5" value={current.pm25} unit="µg/m³" color={current.pm25 > 35 ? '#ef4444' : 'var(--green-400)'} />
              <StatTile label="PM10" value={current.pm10} unit="µg/m³" color={current.pm10 > 150 ? '#ef4444' : 'var(--aqi-moderate)'} />
            </div>

            {/* Forecast row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {forecast.map((f, i) => {
                // ✅ FIX: Force the AI's raw number to be a clean, rounded integer
                const cleanAQI = Math.round(f.aqi || 0); 
                const fc = getAQICategory(cleanAQI);
                
                return (
                  <div key={i} style={{
                    background: 'var(--bg-card)',
                    border: `1px solid ${i === 0 ? 'var(--border-green)' : 'var(--border-subtle)'}`,
                    borderRadius: 'var(--radius-md)',
                    padding: '14px 16px'
                  }}>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>
                      {f.date}{i === 0 && <span style={{ color: 'var(--green-400)', marginLeft: 4 }}>← Predicted</span>}
                    </div>
                    {/* ✅ Render the cleanAQI here */}
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: fc.color }}>
                      {cleanAQI}
                    </div>
                    <div style={{ fontSize: 12, color: fc.color, marginTop: 2 }}>
                      {f.category || fc.label}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* AQI trend mini */}
            <Card style={{ padding: '14px 18px', flex: 1 }}>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                7-Day AQI Trend
              </div>
              <AQIAreaChart data={history} />
            </Card>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 20, borderBottom: '1px solid var(--border-subtle)', paddingBottom: 0 }}>
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                padding: '10px 18px',
                borderRadius: 'var(--radius-full) var(--radius-full) 0 0',
                background: tab === t.id ? 'var(--bg-card)' : 'transparent',
                border: tab === t.id ? '1px solid var(--border-subtle)' : '1px solid transparent',
                borderBottom: tab === t.id ? '1px solid var(--bg-card)' : '1px solid transparent',
                color: tab === t.id ? 'var(--green-400)' : 'var(--text-secondary)',
                fontSize: 14, fontWeight: tab === t.id ? 600 : 400,
                cursor: 'pointer', marginBottom: -1,
                transition: 'var(--transition)'
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="animate-fade-in">
          {tab === 'overview' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <Card>
                <SectionHeading title="Pollutant Breakdown" subtitle="Current readings vs safe thresholds" />
                <PollutantsGrid data={current} />
              </Card>
              <Card>
                <SectionHeading title="Health Advisory" subtitle={isInstitution ? 'Institution mode active' : 'Personalized for you'} />
                <RecommendationPanel aqi={current.aqi} recommendations={recommendations} userType={isInstitution ? 'institution' : 'individual'} />
              </Card>
            </div>
          )}

          {tab === 'pollutants' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {['pm25', 'pm10', 'no2', 'o3', 'co', 'so2'].map(key => {
                const labels = { pm25: 'PM2.5', pm10: 'PM10', no2: 'NO₂', o3: 'O₃', co: 'CO', so2: 'SO₂' }
                const units = { pm25: 'µg/m³', pm10: 'µg/m³', no2: 'ppb', o3: 'ppb', co: 'ppm', so2: 'ppb' }
                const val = current[key]
                const maxes = { pm25: 150, pm10: 250, no2: 200, o3: 150, co: 15, so2: 200 }
                const pct = Math.min((val / maxes[key]) * 100, 100)
                const color = pct < 25 ? 'var(--aqi-good)' : pct < 50 ? 'var(--aqi-moderate)' : 'var(--aqi-unhealthy)'
                return (
                  <Card key={key} hover>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18 }}>{labels[key]}</span>
                      <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{units[key]}</span>
                    </div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 800, color, marginBottom: 12 }}>{val}</div>
                    <div style={{ height: 6, background: 'var(--border-subtle)', borderRadius: 4, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 4, transition: 'width 1.5s ease', boxShadow: `0 0 10px ${color}50` }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                      <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Safe</span>
                      <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Hazardous</span>
                    </div>
                  </Card>
                )
              })}
            </div>
          )}

          {tab === 'forecast' && (
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
              <Card>
                <SectionHeading title="3-Day AQI Forecast" subtitle="AI prediction using XGBoost Regressor" />
                <ForecastChart data={[
                  { date: 'Today', aqi: current.aqi },
                  ...forecast.map(f => ({ date: f.date, aqi: f.aqi }))
                ]} />
                <div style={{ marginTop: 20, padding: '14px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', fontSize: 13, color: 'var(--text-secondary)' }}>
                  <strong style={{ color: 'var(--green-400)' }}>Model:</strong> XGBoost Regressor with SHAP explainability.
                  Features: date, pm25, pm10, no2, so2, co, o3, temp, day_of_week, month.
                </div>
              </Card>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {forecast.map((f, i) => {
                  const fc = getAQICategory(f.aqi)
                  return (
                    <Card key={i} glowing={i === 0}>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>{f.date}</div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, color: fc.color }}>{f.aqi}</div>
                        <div style={{
                          padding: '4px 10px', borderRadius: 'var(--radius-full)',
                          background: fc.bg, border: `1px solid ${fc.border}`,
                          color: fc.color, fontSize: 12, fontWeight: 600
                        }}>{f.category}</div>
                      </div>
                    </Card>
                  )
                })}
              </div>
            </div>
          )}

          {tab === 'history' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <Card>
                <SectionHeading title="AQI Over Last 7 Days" />
                <AQIAreaChart data={history} />
              </Card>
              <Card>
                <SectionHeading title="PM2.5 Daily Readings" />
                <PM25BarChart data={history} />
              </Card>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      {['Date', 'AQI', 'Category', 'PM2.5'].map(h => (
                        <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((row, i) => {
                      const c = getAQICategory(row.aqi)
                      return (
                        <tr key={i} style={{ borderBottom: '1px solid var(--border-subtle)' }}
                          onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-card-hover)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        >
                          <td style={{ padding: '12px 16px', color: 'var(--text-secondary)', fontSize: 14 }}>{row.date}</td>
                          <td style={{ padding: '12px 16px', fontFamily: 'var(--font-display)', fontWeight: 700, color: c.color }}>{row.aqi}</td>
                          <td style={{ padding: '12px 16px' }}>
                            <span style={{ padding: '3px 10px', borderRadius: 'var(--radius-full)', background: c.bg, border: `1px solid ${c.border}`, color: c.color, fontSize: 12 }}>{c.label}</span>
                          </td>
                          <td style={{ padding: '12px 16px', color: 'var(--text-secondary)', fontSize: 14 }}>{row.pm25} µg/m³</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating chatbot */}
      <Chatbot currentAQI={current?.aqi} />
    </div>
  )
}