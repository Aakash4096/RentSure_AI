# 🏠 RentSure AI — Student Housing Platform

[![Stack](https://img.shields.io/badge/Stack-MERN%20%2B%20AI-blue)](https://github.com/Aakash4096/RentSure_AI)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

A full-stack platform that helps students find housing by combining **geospatial property search**, **safety & trust scoring**, and **automated contract analysis**.

---

## ⚙️ How It Works

- **Geospatial Search:** MongoDB 2dsphere index for location-based property queries
- **Safety Score:** Calculated from proximity to safe locations + security amenities
- **Trust Score:** Multi-factor rating based on landlord verification and reviews
- **Contract Scanner:** Python microservice that detects risky clauses in rental PDFs
- **Auth:** JWT with bcrypt password hashing and role-based access control

---

## 🔥 Features

- 📄 Upload rental agreements for automated risk analysis
- 🗺️ Find properties near a location with radius search
- 🛡️ Auto-calculated safety scores (0-100)
- ⭐ Auto-calculated trust scores (0-100)
- 🔐 Secure login/register with JWT

---

## 📂 Project Structure

```text
rentsure-ai/
├── client/                 # React SPA (port 5173)
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── ContractScanner.jsx
│   │   ├── context/        # Global auth state
│   │   └── services/       # Axios API clients
│   └── vite.config.js
│
├── server/                 # Express API (port 5000)
│   ├── src/
│   │   ├── config/         # MongoDB & Env validation
│   │   ├── controllers/
│   │   ├── models/         # Mongoose Schemas (2dsphere, bcrypt)
│   │   ├── routes/v1/
│   │   ├── middleware/     # JWT, Rate Limiter, Logger
│   │   ├── services/       # Safety & Trust scoring engines
│   │   └── utils/
│   ├── server.js
│   └── .env.example
│
├── ai-service/             # Python microservice (port 8000)
│   ├── main.py             # FastAPI contract scanner
│   └── requirements.txt
│
├── README.md
└── .gitignore
```

---

## 🚀 Quick Start

````bash
# Backend
cd server && npm install && npm run dev

# AI Service
cd ai-service && pip install fastapi uvicorn PyPDF2 python-multipart && python main.py

# Frontend
cd client && npm install && npm run dev

# Or use: start-all.bat




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
````

## ✅ Completed Features

- [x] JWT Authentication with role-based access
- [x] Property CRUD with geospatial search
- [x] Safety Score calculation engine
- [x] Trust Score calculation engine
- [x] AI Contract Scanner (Python microservice)
- [x] Responsive React dashboard with Tailwind CSS

👨‍💻 Author
Aakash Kumar — Full Stack Development,

System Architecture, AI Integration

Malaviya National Institute of Technology Jaipur

Department of Electronics & Communication Engineering
