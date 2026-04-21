import React from 'react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, BarChart, Bar
} from 'recharts'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border-green)',
      borderRadius: 8, padding: '10px 14px',
      fontSize: 13,
      boxShadow: 'var(--shadow-card)'
    }}>
      <p style={{ color: 'var(--text-muted)', marginBottom: 4, fontSize: 12 }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color || 'var(--green-400)', fontWeight: 600 }}>
          {p.name}: {p.value} {p.name === 'AQI' ? '' : 'µg/m³'}
        </p>
      ))}
    </div>
  )
}

export function AQIAreaChart({ data = [] }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="aqiGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
        <XAxis dataKey="date" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 200]} />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine y={100} stroke="rgba(234,179,8,0.3)" strokeDasharray="4 4" />
        <ReferenceLine y={150} stroke="rgba(239,68,68,0.3)" strokeDasharray="4 4" />
        <Area
          type="monotone" dataKey="aqi" name="AQI"
          stroke="#22c55e" fill="url(#aqiGrad)"
          strokeWidth={2.5} dot={{ r: 3, fill: '#22c55e' }}
          activeDot={{ r: 5, fill: '#22c55e', strokeWidth: 0 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export function PM25BarChart({ data = [] }) {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
        <XAxis dataKey="date" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="pm25" name="PM2.5" fill="rgba(34,197,94,0.6)" radius={[3, 3, 0, 0]} maxBarSize={24} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export function ForecastChart({ data = [] }) {
  return (
    <ResponsiveContainer width="100%" height={160}>
      <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="forecastGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#eab308" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#eab308" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
        <XAxis dataKey="date" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone" dataKey="aqi" name="AQI"
          stroke="#eab308" fill="url(#forecastGrad)"
          strokeWidth={2} strokeDasharray="6 3"
          dot={{ r: 4, fill: '#eab308', strokeWidth: 0 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
