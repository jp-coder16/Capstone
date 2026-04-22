# AirSense AI 🛰️
### Intelligent Air Quality Monitoring & XGBoost-Powered Forecasting

AirSense AI is a full-stack environmental intelligence platform designed to bridge the gap between raw pollutant data and actionable health insights. By leveraging the MERN stack and a dedicated Python machine learning pipeline, it provides real-time monitoring, 3-day AQI forecasting, and automated health alerts for individuals and institutions.

---

## 🚀 Core Features

* **Predictive Analytics:** Utilizes an XGBoost Regressor model to forecast AQI levels for the next 72 hours with feature-engineered inputs (PM2.5, NO₂, Weather, etc.).
* **Explainable AI (XAI):** Integrated SHAP values to visualize which pollutants are most heavily influencing specific predictions.
* **Multi-Role Dashboards:** Context-aware UI for both individual users and institutions (Schools/Offices) with specific health protocols.
* **Smart Alerts:** Automated NodeMailer system that triggers high-risk email notifications when predicted AQI exceeds safe thresholds.
* **Gemini-Powered Assistant:** A conversational AI interface built with Google Gemini 1.5 Flash to answer complex environmental and health questions.

---

## 🛠️ Technical Architecture

### Tech Stack
* **Frontend:** React.js, Tailwind CSS, Recharts, Framer Motion.
* **Backend:** Node.js, Express.js, JWT Authentication, Nodemailer.
* **Database:** MongoDB Atlas (NoSQL).
* **ML Engine:** Python (Flask/FastAPI), XGBoost, Scikit-learn, SHAP.
* **AI Integration:** Google Generative AI (Gemini 1.5 Flash).



### Project Structure
```text
├── backend/            # Express.js Server & Business Logic
├── frontend/           # React.js Client (Vite)
├── ml/                 # Python XGBoost Model & Inference API
└── docker-compose.yml  # Container Orchestration

⚙️ Installation & Setup
1. Prerequisites
Node.js (v18+)

Python (v3.9+)

MongoDB Atlas Account

Google Gemini API Key

2. Backend Setup
Bash
cd backend
npm install
# Create a .env file with:
# MONGO_URI, JWT_SECRET, GEMINI_API_KEY, EMAIL_USER, EMAIL_PASS
npm run dev

3. Frontend Setup
Bash
cd frontend
npm install
npm run dev

4. ML Server Setup
Bash
cd ml
pip install -r requirements.txt
python3 app.py



🔑 Environment Variables
To run this project, you will need to add the following variables to your .env files:

Backend (/backend/.env):

MONGO_URI - MongoDB connection string

JWT_SECRET - Secret key for token signing

GEMINI_API_KEY - Google AI Studio key

EMAIL_USER - SMTP sender email

EMAIL_PASS - SMTP app password

GOOGLE_CLIENT_ID - For Google Auth integration

ML Server (/ml/.env):

MODEL_PATH - Path to serialized XGBoost model

PORT - Default is 5000

📊 Machine Learning Model Details
The forecasting engine uses an XGBoost Regressor trained on historical environmental datasets.

Features: PM2.5, PM10, NO₂, SO₂, CO, O₃, Temperature, Humidity.

Explainability: Every prediction includes a SHAP (SHapley Additive exPlanations) breakdown to show the impact of each pollutant on the final AQI score.

Evaluation: The model currently achieves an R² score of ~0.94 on test data.

👥 Team 4 (Capstone Project)
Jayant Pachori - Full Stack Lead

Arnav Tongia - ML & Data Engineering

Abhay Singh - Backend & Security

Manas Uday Wani - UI/UX & Frontend

Arpit Yadav - DevOps & QA

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.                        