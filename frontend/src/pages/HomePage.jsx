import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { fetchSystemStats } from '../services/api' // ✅ Import the API

const Feature = ({ icon, title, desc, delay }) => (
  <div
    className={`animate-fade-up delay-${delay}`}
    style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      padding: 28,
      transition: 'all 0.2s ease'
    }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor = 'var(--border-green)'
      e.currentTarget.style.transform = 'translateY(-4px)'
      e.currentTarget.style.boxShadow = 'var(--shadow-green)'
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = 'var(--border-subtle)'
      e.currentTarget.style.transform = 'translateY(0)'
      e.currentTarget.style.boxShadow = 'none'
    }}
  >
    <div style={{
      width: 44, height: 44, borderRadius: 'var(--radius-md)',
      background: 'var(--green-glow)', border: '1px solid var(--border-green)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 20, marginBottom: 16
    }}>{icon}</div>
    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{title}</h3>
    <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6 }}>{desc}</p>
  </div>
)

const Stat = ({ value, label, color = 'var(--green-400)' }) => (
  <div style={{ textAlign: 'center' }}>
    <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, color }}>{value}</div>
    <div style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
  </div>
)

export default function HomePage() {
  const { isAuthenticated } = useAuth()
  
  // ✅ Create state for the live stats
  const [stats, setStats] = useState({
    accuracy: '94.2',
    dataPoints: '0',
    pollutants: '6'
  });

  // ✅ Fetch the real numbers from the backend when the page loads
  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await fetchSystemStats();
        if (res.data && res.data.data) {
          setStats(res.data.data);
        }
      } catch (err) {
        console.error("Could not fetch live stats, using defaults.");
      }
    };
    getStats();
  }, []);

  return (
    <div style={{ paddingTop: 64 }}>
      {/* Hero */}
      <section style={{
        minHeight: '90vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
        padding: '80px 24px'
      }}>
        {/* Radial glow bg */}
        <div style={{
          position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        {/* Grid pattern */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(var(--border-subtle) 1px, transparent 1px),
                             linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 70% 60% at center, black, transparent)',
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: 760, textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div
            className="animate-fade-up"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '6px 14px', borderRadius: 'var(--radius-full)',
              background: 'var(--green-glow)', border: '1px solid var(--border-green)',
              marginBottom: 28, fontSize: 13, color: 'var(--green-400)'
            }}
          >
            <span style={{ width: 6, height: 6, background: 'var(--green-400)', borderRadius: '50%', display: 'inline-block', animation: 'pulse-green 2s infinite' }} />
            AI-Powered Air Quality Intelligence
          </div>

          <h1
            className="animate-fade-up delay-1"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(40px, 7vw, 72px)',
              fontWeight: 800, lineHeight: 1.05,
              marginBottom: 24
            }}
          >
            Breathe Smart.{' '}
            <span className="gradient-text">Stay Safe.</span>
          </h1>

          <p
            className="animate-fade-up delay-2"
            style={{
              fontSize: 18, color: 'var(--text-secondary)',
              maxWidth: 540, margin: '0 auto 40px',
              lineHeight: 1.7
            }}
          >
            AI-driven AQI forecasting with personalized health advisories, real-time monitoring,
            and explainable predictions — for individuals and institutions.
          </p>

          <div className="animate-fade-up delay-3" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            {isAuthenticated ? (
              <Link to="/dashboard" style={{
                padding: '14px 32px', borderRadius: 'var(--radius-full)',
                background: 'var(--green-500)', color: '#080c0a',
                fontWeight: 700, fontSize: 16, display: 'inline-flex', alignItems: 'center', gap: 8
              }}>
                Open Dashboard →
              </Link>
            ) : (
              <>
                <Link to="/register" style={{
                  padding: '14px 32px', borderRadius: 'var(--radius-full)',
                  background: 'var(--green-500)', color: '#080c0a',
                  fontWeight: 700, fontSize: 16
                }}>
                  Get Started Free
                </Link>
                <Link to="/login" style={{
                  padding: '14px 32px', borderRadius: 'var(--radius-full)',
                  background: 'transparent', border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)', fontSize: 16
                }}>
                  For Institutions
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section style={{
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '36px 24px',
        background: 'var(--bg-secondary)'
      }}>
        <div style={{
          maxWidth: 900, margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 24
        }}>
          {/* ✅ THE LIVE STATS */}
          <Stat value={`${stats.accuracy}%`} label="Prediction Accuracy" color="var(--green-400)" />
          <Stat value={`${stats.dataPoints}+`} label="Live Data Points" color="#38bdf8" />
          <Stat value={`${stats.pollutants}+`} label="Pollutants Tracked" color="#c084fc" />
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '80px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <h2 className="animate-fade-up" style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, marginBottom: 12 }}>
            Powerful Features for{' '}
            <span className="gradient-text">Healthier Living</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 16 }}>
            Everything you need to stay informed and protected
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          <Feature delay={1} icon="📡" title="Real-Time AQI Monitoring"
            desc="Live air quality data with instant updates. Track PM2.5, PM10, CO, NO₂, O₃ and more pollutants continuously." />
          <Feature delay={2} icon="🤖" title="AQI Prediction using AI"
            desc="XGBoost + LSTM models predict air quality up to 3 days ahead with feature engineering for accuracy." />
          <Feature delay={3} icon="⚕️" title="Health Risk Classification"
            desc="Automatic risk assessment based on AQI levels. Personalized alerts for low, medium, and high-risk conditions." />
          <Feature delay={4} icon="💡" title="Smart Recommendations"
            desc="Actionable health advice — mask usage, outdoor activity planning, ventilation tips based on air quality." />
          <Feature delay={5} icon="💬" title="AI Chatbot Assistance"
            desc="24/7 AI-powered chatbot to answer questions about air quality, health impacts, and personalized recommendations." />
          <Feature delay={6} icon="🏛️" title="Institutional Dashboards"
            desc="Specialized dashboards for schools, colleges, and offices to manage outdoor activities and campus protocols." />
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: '80px 24px',
        textAlign: 'center',
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-subtle)'
      }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800, marginBottom: 16 }}>
          Ready to breathe smarter?
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 32 }}>
          Join users who rely on AirSense AI for daily air quality intelligence.
        </p>
        <Link to="/register" style={{
          padding: '14px 40px', borderRadius: 'var(--radius-full)',
          background: 'var(--green-500)', color: '#080c0a',
          fontWeight: 700, fontSize: 16, display: 'inline-block'
        }}>
          Start Monitoring →
        </Link>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '32px 24px',
        borderTop: '1px solid var(--border-subtle)',
        textAlign: 'center',
        color: 'var(--text-muted)', fontSize: 13
      }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 8 }}>
          AirSense AI
        </div>
        <p>Team 4 — Capstone Project · MERN Stack · Powered by XGBoost + SHAP</p>
        <p style={{ marginTop: 4 }}>
          Jayant Pachori · Arnav Tongia · Abhay Singh · Manas Uday Wani · Arpit Yadav
        </p>
      </footer>
    </div>
  )
}