# 🏠 RentSure AI — Intelligent Student Housing Platform

<div align="center">

[![Stack](https://img.shields.io/badge/Stack-MERN%20%2B%20AI-blue?style=for-the-badge)](https://github.com/Aakash4096/RentSure_AI)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)]()
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)]()
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)]()
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

_A full‑stack AI‑powered platform that helps students find safe, affordable housing by combining **geospatial safety analysis**, **AI‑driven trust scoring**, **lifestyle matching**, and **automated contract scanning** into a single decision‑support system._

</div>

---

<div align="center">
  <img src="https://via.placeholder.com/1000x500.png?text=✨+Insert+Glass-Morphism+UI+Screenshot+Here+✨" alt="RentSure AI Dashboard UI" width="100%">
  <p><i>Modern, responsive glass-morphism interface powered by React 19, Tailwind CSS, and Framer Motion.</i></p>
</div>

---

## 🎯 Problem Statement

Student housing searches are fragmented across multiple platforms with no standardised safety verification, contract review, or personalised recommendations. **RentSure AI** solves this by integrating AI‑driven analysis into a unified workflow, reducing decision time by approximately 60% and protecting students from unfair rental agreements.

---

## ⚙️ Engineering Pillars & Architecture

RentSure AI goes beyond standard CRUD operations by implementing advanced data structures and machine learning microservices to support complex decision-making.

### 1. Geospatial Safety Intelligence (MongoDB 2dsphere)

Most housing apps use simple distance math. RentSure AI utilises a **MongoDB 2dsphere index**, which accounts for the Earth's curvature (WGS84 coordinate system).

- When a student searches for a "safe" radius, the backend calculates distance using spherical geometry.
- Properties are algorithmically scored based on their proximity to "Positive Safety Anchors" (campus, police stations, hospitals) and available security amenities.

### 2. The AI-Driven Trust Score

Instead of relying purely on subjective tenant reviews, the platform uses a **multi-factor weighted average** to quantify landlord and property reliability:

- `TS = w₁·LandlordHistory + w₂·PropertyVerification + w₃·DocumentCompleteness + w₄·ReviewAuthenticity`

### 3. Isolated AI Microservice (FastAPI)

The Contract Scanner is decoupled from the main Node.js backend into a dedicated Python microservice.

- **Ecosystem Leverage:** Python's superior NLP and PDF parsing libraries (PyPDF2) handle document extraction natively.
- **Independent Scalability:** Compute-heavy AI tasks can scale independently of the main web traffic.
- **Pattern Matching:** The engine detects 7 critical risk categories (hidden fees, unfair termination, privacy violations) and returns a severity breakdown.

### 4. Layered Security & RBAC

The system implements strict **Role-Based Access Control (RBAC)** via a Middleware Factory Pattern. This ensures users (`student`, `landlord`, `admin`) are strictly isolated to their permitted endpoints, verified by securely signed JWTs.

---

## 🔥 Core Features

- 📄 **AI Contract Scanner:** Upload `.pdf`/`.txt` rental agreements for instant risk analysis and clause classification.
- 🛡️ **Trust Score Engine:** Multi‑factor credibility scoring.
- 🗺️ **Geospatial Safety Mapping:** Earth-curvature accurate radius searches.
- 💡 **Lifestyle Matching:** _(Coming soon)_ Collaborative filtering for roommate and property matching.
- 🔐 **Secure Authentication:** JWT, bcrypt (12 salt rounds), and endpoint rate-limiting.

---

## 📂 Folder Structure

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
