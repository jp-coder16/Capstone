import React, { useState } from 'react'
import { Card, Badge, SectionHeading, Button } from '../components/ui'
import { getAQICategory } from '../utils/aqiUtils'
import toast from 'react-hot-toast'

const mockUsers = [
  { id: 1, name: 'Jayant Pachori', email: 'jayant@demo.com', role: 'user', status: 'active', lastLogin: '2 hours ago', aqi: 85 },
  { id: 2, name: 'Arnav Tongia',   email: 'arnav@demo.com',  role: 'user', status: 'active', lastLogin: '1 day ago',   aqi: 92 },
  { id: 3, name: 'Abhay Singh',    email: 'abhay@demo.com',  role: 'admin', status: 'active', lastLogin: '30 mins ago', aqi: 78 },
  { id: 4, name: 'Manas Wani',     email: 'manas@demo.com',  role: 'user', status: 'inactive', lastLogin: '3 days ago', aqi: 115 },
  { id: 5, name: 'Arpit Yadav',    email: 'arpit@demo.com',  role: 'admin', status: 'active', lastLogin: '10 mins ago', aqi: 88 },
  { id: 6, name: 'Delhi School',   email: 'school@delhi.com', role: 'institution', status: 'active', lastLogin: '5 hours ago', aqi: 145 },
]

const stats = [
  { label: 'Total Users', value: 1284, change: '+12%', color: 'var(--green-400)' },
  { label: 'Active Today', value: 342, change: '+8%', color: '#38bdf8' },
  { label: 'Predictions Run', value: 5821, change: '+31%', color: '#c084fc' },
  { label: 'Avg AQI (Today)', value: 94, change: '-5', color: '#eab308' },
]

export default function AdminPage() {
  const [users, setUsers] = useState(mockUsers)
  const [filter, setFilter] = useState('all')

  const filtered = users.filter(u => filter === 'all' || u.role === filter || u.status === filter)

  const toggleStatus = (id) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u))
    toast.success('User status updated')
  }

  return (
    <div style={{ paddingTop: 64, minHeight: '100vh' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800 }}>Admin Panel</h1>
            <Badge color="#ef4444" bg="rgba(239,68,68,0.1)">Admin Only</Badge>
          </div>
          <p style={{ color: 'var(--text-secondary)' }}>System overview and user management</p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 28 }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)', padding: '18px 20px'
            }}>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 10 }}>{s.label}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 12, color: 'var(--green-400)', marginTop: 4 }}>{s.change} vs last week</div>
            </div>
          ))}
        </div>

        {/* System health */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 28 }}>
          {[
            { service: 'ML Prediction API', status: 'online', latency: '43ms', endpoint: '/predict' },
            { service: 'AQI Data Fetcher', status: 'online', latency: '120ms', endpoint: '/aqi/current' },
            { service: 'Recommendation Engine', status: 'online', latency: '28ms', endpoint: '/recommend' },
            { service: 'XAI / SHAP Layer', status: 'online', latency: '89ms', endpoint: '/explain' },
            { service: 'AI Chatbot', status: 'online', latency: '210ms', endpoint: '/chat' },
            { service: 'Auth Service', status: 'online', latency: '15ms', endpoint: '/auth/login' },
          ].map((s, i) => (
            <div key={i} style={{
              background: 'var(--bg-card)',
              border: `1px solid ${s.status === 'online' ? 'var(--border-green)' : 'rgba(239,68,68,0.3)'}`,
              borderRadius: 'var(--radius-md)', padding: '14px 16px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{s.service}</span>
                <span style={{
                  fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
                  color: s.status === 'online' ? 'var(--green-400)' : '#ef4444',
                  display: 'flex', alignItems: 'center', gap: 4
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor', display: 'inline-block' }} />
                  {s.status}
                </span>
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                {s.endpoint} · {s.latency}
              </div>
            </div>
          ))}
        </div>

        {/* User management */}
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <SectionHeading title="User Management" style={{ margin: 0 }} />
            <div style={{ display: 'flex', gap: 8 }}>
              {['all', 'user', 'admin', 'institution', 'active', 'inactive'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    padding: '5px 12px', borderRadius: 'var(--radius-full)',
                    background: filter === f ? 'var(--green-glow)' : 'var(--bg-secondary)',
                    border: `1px solid ${filter === f ? 'var(--border-green)' : 'var(--border-subtle)'}`,
                    color: filter === f ? 'var(--green-400)' : 'var(--text-secondary)',
                    fontSize: 12, cursor: 'pointer', textTransform: 'capitalize'
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                {['User', 'Role', 'Status', 'Last Login', 'Cur. AQI', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(u => {
                const cat = getAQICategory(u.aqi)
                const roleColors = { user: 'var(--text-secondary)', admin: '#ef4444', institution: '#c084fc' }
                return (
                  <tr
                    key={u.id}
                    style={{ borderBottom: '1px solid var(--border-subtle)', transition: 'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-card-hover)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding: '12px 14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{
                          width: 32, height: 32, borderRadius: '50%',
                          background: 'var(--bg-secondary)',
                          border: '1px solid var(--border-subtle)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 12, fontWeight: 700, color: 'var(--green-400)'
                        }}>
                          {u.name[0]}
                        </div>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 600 }}>{u.name}</div>
                          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '12px 14px' }}>
                      <span style={{ fontSize: 12, color: roleColors[u.role], fontWeight: 600, textTransform: 'uppercase' }}>
                        {u.role}
                      </span>
                    </td>
                    <td style={{ padding: '12px 14px' }}>
                      <span style={{
                        fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
                        color: u.status === 'active' ? 'var(--green-400)' : 'var(--text-muted)',
                        display: 'flex', alignItems: 'center', gap: 5
                      }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor', display: 'inline-block' }} />
                        {u.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px 14px', color: 'var(--text-secondary)', fontSize: 13 }}>{u.lastLogin}</td>
                    <td style={{ padding: '12px 14px' }}>
                      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: cat.color }}>{u.aqi}</span>
                    </td>
                    <td style={{ padding: '12px 14px' }}>
                      <button
                        onClick={() => toggleStatus(u.id)}
                        style={{
                          padding: '5px 12px', borderRadius: 'var(--radius-full)', cursor: 'pointer',
                          background: u.status === 'active' ? 'rgba(239,68,68,0.1)' : 'var(--green-glow)',
                          border: `1px solid ${u.status === 'active' ? 'rgba(239,68,68,0.3)' : 'var(--border-green)'}`,
                          color: u.status === 'active' ? '#ef4444' : 'var(--green-400)',
                          fontSize: 12, fontWeight: 600
                        }}
                      >
                        {u.status === 'active' ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  )
}
