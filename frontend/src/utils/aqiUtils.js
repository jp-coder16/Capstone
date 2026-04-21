export const getAQICategory = (aqi) => {
  if (aqi <= 50)  return { label: 'Good',              color: '#22c55e', bg: 'rgba(34,197,94,0.12)',   border: 'rgba(34,197,94,0.3)',   textClass: 'aqi-good' }
  if (aqi <= 100) return { label: 'Moderate',          color: '#eab308', bg: 'rgba(234,179,8,0.12)',   border: 'rgba(234,179,8,0.3)',   textClass: 'aqi-moderate' }
  if (aqi <= 150) return { label: 'Unhealthy for SG',  color: '#f97316', bg: 'rgba(249,115,22,0.12)',  border: 'rgba(249,115,22,0.3)',  textClass: '' }
  if (aqi <= 200) return { label: 'Unhealthy',         color: '#ef4444', bg: 'rgba(239,68,68,0.12)',   border: 'rgba(239,68,68,0.3)',   textClass: 'aqi-unhealthy' }
  if (aqi <= 300) return { label: 'Very Unhealthy',    color: '#a855f7', bg: 'rgba(168,85,247,0.12)',  border: 'rgba(168,85,247,0.3)',  textClass: '' }
  return            { label: 'Hazardous',              color: '#991b1b', bg: 'rgba(153,27,27,0.12)',   border: 'rgba(153,27,27,0.3)',   textClass: 'aqi-hazardous' }
}

export const getRiskLevel = (aqi) => {
  if (aqi <= 100) return { label: 'Low Risk',    color: '#22c55e', icon: '🟢' }
  if (aqi <= 150) return { label: 'Medium Risk', color: '#eab308', icon: '🟡' }
  return            { label: 'High Risk',        color: '#ef4444', icon: '🔴' }
}

export const formatAQI = (val) => Math.round(val)

export const getPollutantStatus = (key, val) => {
  const thresholds = {
    pm25: [12, 35.4, 55.4, 150.4],
    pm10: [54, 154, 254, 354],
    no2:  [53, 100, 360, 649],
    o3:   [54, 70, 85, 105],
    co:   [4.4, 9.4, 12.4, 15.4],
    so2:  [35, 75, 185, 304],
  }
  const t = thresholds[key]
  if (!t) return 'unknown'
  if (val <= t[0]) return 'good'
  if (val <= t[1]) return 'moderate'
  if (val <= t[2]) return 'unhealthy-sg'
  if (val <= t[3]) return 'unhealthy'
  return 'hazardous'
}

export const pollutantLabels = {
  pm25: 'PM2.5', pm10: 'PM10', no2: 'NO₂',
  o3: 'O₃', co: 'CO', so2: 'SO₂'
}

export const pollutantUnits = {
  pm25: 'µg/m³', pm10: 'µg/m³', no2: 'ppb',
  o3: 'ppb', co: 'ppm', so2: 'ppb', temperature: '°C', humidity: '%'
}
