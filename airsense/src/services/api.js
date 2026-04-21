import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' }
})

// Response interceptor
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

// ─── AQI ──────────────────────────────────────────────
export const fetchCurrentAQI = (location) =>
  api.get('/aqi/current', { params: { location } })

export const fetchAQIHistory = (location, days = 7) =>
  api.get('/aqi/history', { params: { location, days } })

// ─── ML / Predict ──────────────────────────────────────
export const predictAQI = (data) => api.post('/predict', data)

export const recommendActions = (aqi, userType) =>
  api.post('/recommend', { aqi, userType })

export const explainPrediction = (features) =>
  api.post('/explain', { features })

// ─── Chat ──────────────────────────────────────────────
export const sendChatMessage = (message, history) =>
  api.post('/chat', { message, history })

// ─── Auth ──────────────────────────────────────────────
export const loginUser = (email, password) =>
  api.post('/auth/login', { email, password })

export const registerUser = (name, email, password, role) =>
  api.post('/auth/register', { name, email, password, role })

// ─── Mock Data (fallback when backend not running) ─────
export const getMockAQIData = () => ({
  current: {
    aqi: 85,
    category: 'Moderate',
    location: 'Your City',
    pm25: 28.4,
    pm10: 45.2,
    no2: 38.1,
    o3: 52.3,
    co: 0.8,
    so2: 12.1,
    temperature: 32,
    humidity: 65,
    updatedAt: new Date().toISOString()
  },
  forecast: [
    { date: 'Today', aqi: 85, category: 'Moderate' },
    { date: 'Tomorrow', aqi: 92, category: 'Moderate' },
    { date: 'Day 3', aqi: 110, category: 'Unhealthy for SG' },
  ],
  history: Array.from({ length: 7 }, (_, i) => ({
    date: new Date(Date.now() - (6 - i) * 86400000).toLocaleDateString('en', { month: 'short', day: 'numeric' }),
    aqi: Math.floor(60 + Math.random() * 60),
    pm25: Math.floor(15 + Math.random() * 30)
  })),
  recommendations: {
    riskLevel: 'Medium',
    outdoor: false,
    mask: 'N95 recommended',
    exercise: 'Move indoors',
    ventilation: 'Keep windows closed',
    tips: [
      'Limit prolonged outdoor exertion',
      'Wear N95/KN95 mask if going outside',
      'Keep windows and doors closed',
      'Use air purifier if available',
      'Stay hydrated and monitor symptoms'
    ]
  }
})

export default api
