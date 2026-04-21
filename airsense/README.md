# AirSense AI — Frontend

**Team 4 · Capstone Project · MERN Stack**

AI-Driven Smart AQI Forecasting & Hygiene Advisory System

---

## Team Members
| Name | Role |
|---|---|
| Jayant Pachori | Project Manager / Frontend Developer |
| Arnav Tongia | AI/ML Developer |
| Abhay Singh | Cyber Security Lead |
| Manas Uday Wani | DevOPS Engineer |
| Arpit Yadav | Backend Developer |

---

## Tech Stack
- **Framework:** React 18 + Vite
- **Routing:** React Router v6
- **Charts:** Recharts
- **HTTP Client:** Axios
- **Notifications:** React Hot Toast
- **Fonts:** Syne (display) + DM Sans (body)

---

## Pages & Features

| Route | Page | Auth Required |
|---|---|---|
| `/` | Landing Page | No |
| `/login` | Login | No |
| `/register` | Registration | No |
| `/dashboard` | Main Dashboard | Yes |
| `/predict` | AQI Prediction Engine | Yes |
| `/history` | 30-Day History & Charts | Yes |
| `/admin` | Admin Panel | Admin only |

### Dashboard Features
- **AQI Gauge** — animated semi-circle meter
- **Real-time pollutant grid** — PM2.5, PM10, NO₂, O₃, CO, SO₂
- **3-Day Forecast** cards
- **7-day AQI trend** area chart
- **Recommendation Panel** — personalized health advisory
- **Institution Mode toggle** — school/office safety guidance
- **AI Chatbot** — floating chat widget (calls `/chat` API)
- **Tabs:** Overview | Pollutants | Forecast | History

### Predict Page
- Manual pollutant input form (8 features)
- Calls backend `/predict` endpoint (XGBoost Regressor)
- Shows predicted AQI on animated gauge
- **SHAP Explainability bars** — visual XAI display

### Admin Panel
- System health monitoring for all API endpoints
- User management with role-based filtering
- Real-time stats: total users, predictions, avg AQI

---

## API Endpoints Used

| Endpoint | Method | Description |
|---|---|---|
| `/auth/login` | POST | JWT authentication |
| `/auth/register` | POST | User registration |
| `/predict` | POST | XGBoost AQI prediction |
| `/recommend` | POST | Personalized recommendations |
| `/explain` | POST | SHAP feature importance |
| `/chat` | POST | AI chatbot messages |
| `/aqi/current` | GET | Real-time AQI |
| `/aqi/history` | GET | Historical data |

---

## Setup & Run

```bash
# Install dependencies
npm install

# Create .env.local
cp .env.example .env.local
# Edit VITE_API_URL to point to your backend

# Development
npm run dev
# Runs on http://localhost:5173

# Production build
npm run build
npm run preview
```

---

## Project Structure

```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── charts/        # Recharts wrappers
│   │   ├── dashboard/     # AQIGauge, Chatbot, PollutantsGrid, etc.
│   │   ├── layout/        # Navbar, ProtectedRoute
│   │   └── ui/            # Card, Button, Input, Badge, etc.
│   ├── context/
│   │   └── AuthContext.jsx  # JWT auth state
│   ├── pages/             # Route-level page components
│   ├── services/
│   │   └── api.js         # Axios + all API calls
│   ├── utils/
│   │   └── aqiUtils.js    # AQI color/category helpers
│   ├── App.jsx            # Router + providers
│   ├── index.css          # Global styles + CSS variables
│   └── main.jsx           # Entry point
├── .env.example
├── package.json
└── vite.config.js
```

---

## Security (Frontend Side)
- JWT stored in `localStorage`, sent as `Authorization: Bearer <token>`
- Auth interceptor auto-redirects to `/login` on 401
- Role-based route protection (user / admin)
- Input validation on all forms

---

## Notes for Evaluators
The frontend works with **mock data** when the backend is not running —
all pages render fully without a live API connection.
Use the **demo login buttons** on the login page to test:
- Regular User: `user@demo.com` / `demo123`
- Admin: `admin@demo.com` / `admin123`
