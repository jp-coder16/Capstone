import React, { useState, useRef, useEffect } from 'react'
import { sendChatMessage } from '../../services/api'

const BotIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><circle cx="9" cy="16" r="1"/><circle cx="15" cy="16" r="1"/>
  </svg>
)
const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
)

const SUGGESTIONS = [
  'What does AQI 150 mean?',
  'Should I wear a mask today?',
  'Is it safe to exercise outside?',
  'What causes high PM2.5?',
]

// Simple helper to convert markdown **bold** to HTML <strong>
const formatMessage = (text) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

export default function Chatbot({ currentAQI }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hi! I'm AirSense AI. I can help you understand air quality data, health risks, and personalized recommendations. Current AQI is **${currentAQI || '—'}**. What would you like to know?`
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async (text) => {
    const msg = text || input.trim()
    if (!msg || loading) return
    setInput('')

    // Add user message to UI immediately
    const newMessages = [...messages, { role: 'user', content: msg }]
    setMessages(newMessages)
    setLoading(true)

    try {
      // ✅ Send the message AND the history to the backend
      const res = await sendChatMessage(msg, messages)
      setMessages([...newMessages, { role: 'assistant', content: res.data.reply }])
    } catch (err) {
      console.error("Chatbot Error:", err);
      // Fallback response if the Llama API is down or missing key
      const fallback = getFallbackResponse(msg, currentAQI)
      setMessages([...newMessages, { role: 'assistant', content: fallback }])
    } finally {
      setLoading(false)
    }
  }

  const getFallbackResponse = (msg, aqi) => {
    const m = msg.toLowerCase()
    if (m.includes('aqi') && m.includes('mean'))
      return 'AQI (Air Quality Index) measures air pollution. 0-50 = Good, 51-100 = Moderate, 101-150 = Unhealthy for Sensitive, 151-200 = Unhealthy, 201-300 = Very Unhealthy.'
    if (m.includes('mask'))
      return aqi > 100 ? `With AQI at ${aqi}, I strongly recommend wearing an **N95 mask** outdoors.` : `AQI is currently ${aqi}. No mask required.`
    if (m.includes('exercise'))
      return aqi > 100 ? `AQI is ${aqi}. Please **move exercise indoors**.` : 'Air quality is acceptable for outdoor exercise!'
    return `Based on the AQI of ${aqi || '—'}, ${aqi > 150 ? 'stay indoors and use an air purifier.' : 'normal activities are fine.'} (Note: AI backend is currently offline).`
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 500,
          width: 56, height: 56, borderRadius: '50%',
          background: 'var(--green-500)', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#080c0a', boxShadow: '0 4px 20px rgba(34,197,94,0.4)',
          transition: 'all 0.2s', animation: 'pulse-green 2s infinite'
        }}
        title="Open AI Chatbot"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      </button>
    )
  }

  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 500,
      width: 360, height: 520, background: 'var(--bg-card)',
      border: '1px solid var(--border-green)', borderRadius: 'var(--radius-xl)',
      boxShadow: '0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(34,197,94,0.1)',
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
      animation: 'fadeUp 0.3s ease'
    }}>
      {/* Header */}
      <div style={{
        padding: '14px 16px', borderBottom: '1px solid var(--border-subtle)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'var(--bg-secondary)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 32, height: 32, background: 'var(--green-glow)',
            border: '1px solid var(--border-green)', borderRadius: '50%', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--green-400)'
          }}>
            <BotIcon />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>AirSense AI (Llama 3)</div>
            <div style={{ fontSize: 11, color: 'var(--green-400)', display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 6, height: 6, background: 'var(--green-400)', borderRadius: '50%', display: 'inline-block' }} />
              Online
            </div>
          </div>
        </div>
        <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: 18 }}>×</button>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: '85%', padding: '10px 14px',
              borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
              background: msg.role === 'user' ? 'var(--green-600)' : 'var(--bg-secondary)',
              border: msg.role === 'user' ? 'none' : '1px solid var(--border-subtle)',
              fontSize: 13, lineHeight: 1.5,
              color: msg.role === 'user' ? '#fff' : 'var(--text-primary)',
              whiteSpace: 'pre-wrap'
            }}>
              {/* ✅ Formats markdown bold correctly */}
              {formatMessage(msg.content)}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', gap: 4, padding: '8px 12px', alignItems: 'center' }}>
            {[0,1,2].map(i => (
              <span key={i} style={{
                width: 6, height: 6, background: 'var(--green-400)',
                borderRadius: '50%', display: 'block',
                animation: `fadeIn 0.5s ${i * 0.15}s infinite alternate`
              }} />
            ))}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div style={{ padding: '0 12px 8px', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {SUGGESTIONS.map(s => (
            <button key={s} onClick={() => sendMessage(s)} style={{
              padding: '5px 12px', borderRadius: 'var(--radius-full)',
              background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)',
              color: 'var(--text-secondary)', fontSize: 12, cursor: 'pointer', transition: 'var(--transition)'
            }}>
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div style={{
        padding: '10px 12px', borderTop: '1px solid var(--border-subtle)',
        display: 'flex', gap: 8, alignItems: 'center'
      }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
          placeholder="Ask about air quality..."
          style={{
            flex: 1, background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-full)', padding: '10px 14px',
            color: 'var(--text-primary)', fontSize: 13, outline: 'none'
          }}
          onFocus={e => e.target.style.borderColor = 'var(--border-green-strong)'}
          onBlur={e => e.target.style.borderColor = 'var(--border-subtle)'}
        />
        <button
          onClick={() => sendMessage()} disabled={!input.trim() || loading}
          style={{
            width: 38, height: 38, borderRadius: '50%',
            background: input.trim() ? 'var(--green-500)' : 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: input.trim() ? 'pointer' : 'default', color: input.trim() ? '#080c0a' : 'var(--text-muted)',
            transition: 'var(--transition)'
          }}
        >
          <SendIcon />
        </button>
      </div>
    </div>
  )
}