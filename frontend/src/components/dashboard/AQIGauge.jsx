import React, { useEffect, useState } from 'react'
import { getAQICategory } from '../../utils/aqiUtils'

export default function AQIGauge({ aqi = 0, size = 200 }) {
  const [displayAQI, setDisplayAQI] = useState(0)
  const cat = getAQICategory(aqi)

  useEffect(() => {
    let start = 0
    const step = aqi / 50
    const timer = setInterval(() => {
      start += step
      if (start >= aqi) { setDisplayAQI(aqi); clearInterval(timer) }
      else setDisplayAQI(Math.round(start))
    }, 20)
    return () => clearInterval(timer)
  }, [aqi])

  // Semi-circle gauge
  const cx = size / 2
  const cy = size * 0.65
  const r = size * 0.38
  const strokeW = size * 0.055

  // Arc from 180° to 0° (left to right)
  const startAngle = Math.PI
  const endAngle = 0

  const polarToCart = (angle) => ({
    x: cx + r * Math.cos(angle),
    y: cy - r * Math.sin(angle)
  })

  const describeArc = (start, end) => {
    const s = polarToCart(start)
    const e = polarToCart(end)
    return `M ${s.x} ${s.y} A ${r} ${r} 0 ${start - end > Math.PI ? 1 : 0} 1 ${e.x} ${e.y}`
  }

  // Progress angle
  const pct = Math.min(aqi / 300, 1)
  const progressEnd = startAngle - pct * Math.PI

  // Needle
  const needleAngle = startAngle - pct * Math.PI
  const needleTip = polarToCart(needleAngle)

  // Color stops
  const segments = [
    { from: Math.PI, to: Math.PI * 5/6, color: '#22c55e' },
    { from: Math.PI * 5/6, to: Math.PI * 4/6, color: '#84cc16' },
    { from: Math.PI * 4/6, to: Math.PI * 3/6, color: '#eab308' },
    { from: Math.PI * 3/6, to: Math.PI * 2/6, color: '#f97316' },
    { from: Math.PI * 2/6, to: Math.PI * 1/6, color: '#ef4444' },
    { from: Math.PI * 1/6, to: 0, color: '#991b1b' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <svg width={size} height={size * 0.72} viewBox={`0 0 ${size} ${size * 0.72}`}>
        {/* BG arc */}
        <path
          d={describeArc(startAngle, endAngle)}
          fill="none"
          stroke="var(--border-subtle)"
          strokeWidth={strokeW}
          strokeLinecap="round"
        />

        {/* Color segments */}
        {segments.map((seg, i) => (
          <path
            key={i}
            d={describeArc(seg.from, seg.to)}
            fill="none"
            stroke={seg.color}
            strokeWidth={strokeW}
            strokeLinecap="butt"
            opacity="0.3"
          />
        ))}

        {/* Progress arc */}
        {aqi > 0 && (
          <path
            d={describeArc(startAngle, progressEnd)}
            fill="none"
            stroke={cat.color}
            strokeWidth={strokeW}
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 6px ${cat.color}60)` }}
          />
        )}

        {/* Needle */}
        <line
          x1={cx} y1={cy}
          x2={needleTip.x} y2={needleTip.y}
          stroke={cat.color}
          strokeWidth={2.5}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 4px ${cat.color})` }}
        />
        <circle cx={cx} cy={cy} r={6} fill={cat.color} />
        <circle cx={cx} cy={cy} r={3} fill="var(--bg-primary)" />

        {/* AQI value */}
        <text
          x={cx} y={cy - r * 0.35}
          textAnchor="middle"
          fill="var(--text-primary)"
          fontFamily="'Syne', sans-serif"
          fontWeight="800"
          fontSize={size * 0.18}
        >
          {displayAQI}
        </text>

        {/* Labels */}
        <text x={size * 0.08} y={cy + 18} fill="var(--text-muted)" fontSize={size * 0.06} fontFamily="'DM Sans', sans-serif">0</text>
        <text x={size * 0.82} y={cy + 18} fill="var(--text-muted)" fontSize={size * 0.06} fontFamily="'DM Sans', sans-serif">300</text>
      </svg>

      {/* Category badge */}
      <div style={{
        marginTop: -8,
        padding: '6px 16px',
        borderRadius: 'var(--radius-full)',
        background: cat.bg,
        border: `1px solid ${cat.border}`,
        color: cat.color,
        fontSize: 13, fontWeight: 600
      }}>
        {cat.label}
      </div>
    </div>
  )
}
