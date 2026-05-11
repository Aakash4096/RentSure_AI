# 🏠 RentSure AI — Intelligent Student Housing Platform

[![Stack](https://img.shields.io/badge/Stack-MERN%20%2B%20AI-blue)](https://github.com/Aakash4096/RentSure_AI)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

A full‑stack AI‑powered platform that helps students find safe, affordable housing by combining **geospatial safety analysis**, **AI‑driven trust scoring**, **lifestyle matching**, and **automated contract scanning** into a single decision‑support system.

---

## 🎯 Problem Statement

Student housing searches are fragmented across multiple platforms with no standardised safety verification, contract review, or personalised recommendations. RentSure AI solves this by integrating AI‑driven analysis into a unified workflow, reducing decision time by approximately 60 % and protecting students from unfair rental agreements.

---

## 🏗️ System Architecture

| Layer          | Technology                                  | Role                                                                           |
| :------------- | :------------------------------------------ | :----------------------------------------------------------------------------- |
| **Frontend**   | React 19, Vite, Tailwind CSS, Framer Motion | Responsive SPA with glass‑morphism UI and page transitions                     |
| **Backend**    | Node.js, Express, JWT, bcrypt               | REST API with layered security (Helmet, CORS, rate limiting)                   |
| **Database**   | MongoDB, Mongoose ODM, 2dsphere index       | Schema‑flexible storage with geospatial queries for location search            |
| **AI Service** | Python, FastAPI, PyPDF2                     | Isolated microservice for contract document analysis and clause classification |

---

## 🔥 Core Features

### 1. 📄 AI Contract Scanner

- Upload `.pdf` or `.txt` rental agreements
- Pattern‑matching engine detects **7 risk categories** (hidden fees, unfair termination, privacy violations, etc.)
- Returns a **risk score (0‑100)**, severity breakdown, and flagged keywords
- Visualised with animated risk bar and clause cards in the dashboard

### 2. 🛡️ Trust Score Engine

- Multi‑factor credibility score: `TS = w₁·LandlordHistory + w₂·PropertyVerification + w₃·DocumentCompleteness + w₄·ReviewAuthenticity`
- Configurable weights learned from historical data

### 3. 🗺️ Geospatial Safety Mapping

- Uses MongoDB **2dsphere index** for accurate Earth‑curvature calculations
- Scores properties based on proximity to safe locations (campus, police, hospital)
- Bonus for security amenities (CCTV, gated community, security guard)

### 4. 💡 Lifestyle Matching (coming soon)

- Content‑based filtering with cosine similarity between student preferences and property feature vectors
- Collaborative filtering to learn from similar users’ successful matches

### 5. 🔐 JWT Authentication & RBAC

- **bcrypt** hashing with 12 salt rounds
- JWT signed with configurable expiry (7 days)
- **Role‑based access control** (`student`, `landlord`, `admin`) via middleware factory pattern

---

rentsure-ai/
├── client/ # React SPA (port 5173)
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/
│ │ │ ├── Login.jsx # Authentication page
│ │ │ ├── Register.jsx # User registration
│ │ │ ├── Dashboard.jsx # Property analytics
│ │ │ └── ContractScanner.jsx # Contract AI analysis
│ │ ├── context/
│ │ │ └── AuthContext.jsx # Global auth state
│ │ └── services/
│ │ └── api.js # Axios client
│ ├── package.json
│ └── vite.config.js
│
├── server/ # Express API (port 5000)
│ ├── src/
│ │ ├── config/
│ │ │ ├── database.js # MongoDB connection
│ │ │ └── env.js # Environment validation
│ │ ├── controllers/
│ │ │ ├── auth.controller.js
│ │ │ └── property.controller.js
│ │ ├── models/
│ │ │ ├── User.js # User schema (bcrypt + JWT)
│ │ │ └── Property.js # Property schema (2dsphere)
│ │ ├── routes/v1/
│ │ │ ├── auth.routes.js
│ │ │ ├── property.routes.js
│ │ │ └── contract.routes.js
│ │ ├── middleware/
│ │ │ ├── auth.middleware.js # JWT verification
│ │ │ ├── rateLimiter.js
│ │ │ └── requestLogger.js
│ │ ├── services/
│ │ │ ├── safety.service.js # Safety score engine
│ │ │ └── trust.service.js # Trust score engine
│ │ └── utils/
│ │ ├── ApiError.js
│ │ ├── asyncHandler.js
│ │ └── logger.js
│ ├── server.js
│ ├── package.json
│ └── .env.example
│
├── ai-service/ # Python microservice (port 8000)
│ ├── main.py # FastAPI contract scanner
│ └── requirements.txt
│
├── README.md
├── LICENSE
└── .gitignore

text

---

## 🔌 API Endpoints

### Auth

| Method | Endpoint                | Description              | Auth         |
| :----- | :---------------------- | :----------------------- | :----------- |
| POST   | `/api/v1/auth/register` | Register new user        | Public       |
| POST   | `/api/v1/auth/login`    | Login, returns JWT       | Public       |
| GET    | `/api/v1/auth/me`       | Get current user profile | Bearer Token |

### Properties

| Method | Endpoint                                           | Description              |
| :----- | :------------------------------------------------- | :----------------------- |
| GET    | `/api/v1/properties`                               | List all properties      |
| GET    | `/api/v1/properties/nearby?lat=&lng=&maxDistance=` | Geospatial search        |
| POST   | `/api/v1/properties`                               | Create a new listing     |
| PUT    | `/api/v1/properties/:id/safety`                    | Recalculate safety score |
| PUT    | `/api/v1/properties/:id/trust`                     | Update trust score       |

### Contract Scanner

| Method | Endpoint                 | Description                    |
| :----- | :----------------------- | :----------------------------- |
| POST   | `/api/v1/contracts/scan` | Upload PDF/TXT for AI analysis |

---

## 🛡️ Security Implementation

- **Password storage:** bcrypt with 12 salt rounds; password field excluded from queries by default (`select: false`)
- **JWT:** Signed tokens with server‑side secret, 7‑day expiry, verified on protected routes
- **HTTP Headers:** Helmet.js sets X‑Content‑Type‑Options, X‑Frame‑Options, X‑XSS‑Protection, removes `X‑Powered‑By`
- **CORS:** Whitelisted origins with credentials enabled
- **Rate Limiting:** In‑memory sliding window algorithm with configurable thresholds
- **Input Validation:** Mongoose schema validators with custom error messages
- **Environment Isolation:** Secrets in `.env`, enforced by `.gitignore`

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- MongoDB ≥ 7
- Python ≥ 3.11
- Git

### Installation

```bash
git clone https://github.com/Aakash4096/RentSure_AI.git
cd RentSure_AI

# Backend
cd server
npm install
cp .env.example .env   # edit with your values
npm run dev             # → http://localhost:5000

# AI Service
cd ../ai-service
pip install fastapi uvicorn PyPDF2 python-multipart
python main.py          # → http://localhost:8000

# Frontend
cd ../client
npm install
npm run dev             # → http://localhost:5173
🧪 Testing
bash
# Register & login
curl -X POST http://localhost:5000/api/v1/auth/register -H "Content-Type: application/json" -d '{"name":"Test","email":"test@test.com","password":"password123"}'
curl -X POST http://localhost:5000/api/v1/auth/login -H "Content-Type: application/json" -d '{"email":"test@test.com","password":"password123"}'

# Create a property
curl -X POST http://localhost:5000/api/v1/properties -H "Content-Type: application/json" -d '{"title":"Safe Hostel","address":{"full":"Near MNIT","lat":26.8628,"lng":75.8092},"price":{"monthly":5000},"amenities":["WiFi","CCTV"]}'

# Scan a contract
curl -X POST http://localhost:8000/scan -F "file=@test.txt"
```

📈 Future Roadmap
OpenAI GPT‑4 integration for conversational property search

Google Maps API for interactive map view

Real‑time WebSocket notifications

Tenant review verification system

ML‑based rent price prediction

React Native mobile application

👨‍💻 Author
Aakash Kumar — Full Stack Development,

System Architecture, AI Integration

Malaviya National Institute of Technology Jaipur

Department of Electronics & Communication Engineering
