import axios from 'axios';

// Ensure this matches the port we set in the backend .env
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Interceptor to attach the JWT token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// --- AUTH ENDPOINTS ---
export const registerUser = (userData) => API.post('/auth/signup', userData);
export const loginUser = (userData) => API.post('/auth/login', userData);
export const fetchProfile = () => API.get('/auth/profile');

// --- ML ENDPOINTS ---
export const predictAQI = (data) => API.post('/ml/predict', data);
export const explainPrediction = (data) => API.post('/ml/explain', { features: data });

// --- CHATBOT ENDPOINTS ---
// Chatbot endpoint
export const sendChatMessage = (message, history) => API.post('/chatbot/ask', { message, history });

// --- AQI DASHBOARD ENDPOINTS ---
export const fetchCurrentAQI = () => API.get('/aqi/current');
export const fetchAQIHistory = () => API.get('/aqi/history');

export const fetchDashboardData = () => API.get('/dashboard');

// ✅ ADD THIS LINE:
export const fetchSystemStats = () => API.get('/dashboard/stats');



// --- MOCK DATA (Restored for your UI charts) ---
// --- MOCK DATA (Fallback if backend/DB is empty) ---
export const getMockAQIData = () => {
  return {
    current: {
      aqi: 45,
      location: 'Demo Station (Mock Data)',
      updatedAt: new Date().toISOString(),
      temperature: 24,
      humidity: 45,
      pm25: 12,
      pm10: 20,
      no2: 15,
      o3: 35,
      co: 0.4,
      so2: 4,
      wind: 6
    },
    history: [
      { date: 'Mon', aqi: 42, pm25: 10 },
      { date: 'Tue', aqi: 48, pm25: 14 },
      { date: 'Wed', aqi: 55, pm25: 18 },
      { date: 'Thu', aqi: 60, pm25: 22 },
      { date: 'Fri', aqi: 50, pm25: 15 },
      { date: 'Sat', aqi: 45, pm25: 12 },
      { date: 'Sun', aqi: 45, pm25: 12 }
    ],
    forecast: [
      { date: 'Tomorrow', aqi: 50, category: 'Good' },
      { date: 'Day 3', aqi: 55, category: 'Moderate' },
      { date: 'Day 4', aqi: 48, category: 'Good' }
    ],
    recommendations: [
      'Air quality is ideal! Perfect for outdoor workouts.',
      'Open your windows to bring in fresh air.',
      'No masks required today.'
    ]
  };
};
export default API;