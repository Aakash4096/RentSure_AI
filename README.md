# 🏠 RentSure AI — Distributed Student Housing & Risk Analytics Platform

[![Stack](https://shields.io)](https://github.com)
[![License](https://shields.io)](LICENSE)

RentSure AI is a decoupled, microservices-based full-stack platform designed to optimize student housing verification. The system combines high-performance geospatial querying, rule-based algorithmic scoring, and an asynchronous Python microservice for automated rental contract risk extraction.

---

## 🏗️ System Architecture & Data Flow

The platform utilizes a multi-language distributed architecture to leverage the best capabilities of both runtime environments: Node.js for rapid asynchronous I/O and user management, and Python (FastAPI) for compute-heavy file parsing and text analysis.

```text
[ React.js SPA Client ] 
       │
       │ (Multipart Form HTTP POST / Upload PDF)
       ▼
[ Node.js / Express Gateway ] ──(Secure Internal Axios Proxy)──> [ FastAPI Microservice ]
       │                                                                │
       │ (Read/Write Shared Coordinates & Metrics)                      │ (PyPDF2 Text Extraction
       ▼                                                                │  & Token Pattern Matching)
[ MongoDB (2dsphere Index) ] <──(Sync Struct Risk Assessment)───────────┘
```

---

## ⚙️ Core Engineering Implementations

*   **Geospatial Discovery Pipeline:** Uses a MongoDB `2dsphere` index to compute spherical geometry queries. It utilizes the `$near` operator combined with a `$maxDistance` constraint to calculate exact property coordinates relative to university hubs.
*   **Algorithmic Safety Engine:** Generates a deterministic safety score (0–100) using proximity factors to emergency services and point-weighted amenities vectors.
*   **Multi-Factor Trust Engine:** Computes real-time landlord reliability ratings based on document verification status, historic user reviews, and response latency.
*   **Automated Contract Scanner:** A lightweight Python microservice processing binary file streams to parse text data and flag non-standard liability clauses.
*   **Defensive Security Middleware:** Implements stateless JWT authentication, cryptographically hashed passwords with `bcrypt` (12 salt rounds), strict route protection, and global CORS policies.

---

## 📂 Architecture Layout

```text
rentsure-ai/
├── client/                 # React SPA UI Ecosystem (Vite)
│   ├── src/
│   │   ├── components/     # Atomic UI components
│   │   ├── pages/          # Routed view layers (Dashboard, Scanner, Auth)
│   │   ├── context/        # Stateless Global Authentication State
│   │   └── services/       # Axios API client wrappers
│   └── vite.config.js
│
├── server/                 # Express Gateway Application
│   ├── src/
│   │   ├── config/         # Database pooling & environment schemas
│   │   ├── controllers/    # Request interception & business logic orchestration
│   │   ├── models/         # Mongoose Schemas (Geospatial layers, data hiding)
│   │   ├── routes/v1/      # Express Router API version boundaries
│   │   ├── middleware/     # JWT Auth guards, Rate limiters, Security headers
│   │   └── services/       # Computational engines (Safety & Trust scoring)
│   └── server.js
│
├── ai-service/             # Python Analytics Microservice
│   ├── main.py             # FastAPI engine & route definitions
│   └── requirements.txt    # System dependencies
└── README.md
```

---

## 🔌 API Specifications

### Identity & Authentication Management


| Method | Endpoint                | Context / Action | Access Control |
| :----- | :---------------------- | :--------------- | :------------- |
| POST   | `/api/v1/auth/register` | Register Account | Public |
| POST   | `/api/v1/auth/login`    | Issue Stateless Token | Public |
| GET    | `/api/v1/auth/me`       | Hydrate Profile State | Bearer Token |

### Geospatial Property Engine


| Method | Endpoint                                           | Context / Action | Access Control |
| :----- | :------------------------------------------------- | :--------------- | :------------- |
| GET    | `/api/v1/properties`                               | Aggregate List | Public |
| GET    | `/api/v1/properties/nearby?lat=&lng=&maxDistance=` | Radial Coordinate Query | Public |
| POST   | `/api/v1/properties`                               | Publish Listing | Authenticated |
| PUT    | `/api/v1/properties/:id/safety`                    | Mutate Safety Metrics | System Internal |
| PUT    | `/api/v1/properties/:id/trust`                     | Mutate Reliability Metrics | System Internal |

### Document Parsing Microservice


| Method | Endpoint                 | Context / Action | Access Control |
| :----- | :----------------------- | :--------------- | :------------- |
| POST   | `/api/v1/contracts/scan` | Stream PDF for Risk Parsing | Authenticated |

---

## 🛡️ Production Security Engineering

*   **Data Hiding:** The password field is explicitly decoupled from data queries using Mongoose's `select: false` setting to prevent accidental leaks.
*   **HTTP Header Security:** `Helmet.js` configuration automatically injects mitigation headers against XSS (`X-XSS-Protection`) and framing exploits (`X-Frame-Options`).
*   **Brute-Force Mitigation:** Built-in network rate-limiting using an in-memory sliding window algorithm to throttle malicious endpoint spikes.

---

## 🚀 Installation & Local Deployment

### Technical Prerequisites
*   Node.js ≥ 18.x
*   MongoDB Atlas or local instance ≥ 7.x
*   Python ≥ 3.11.x

### Deployment Steps

1. Clone the codebase and move to the root directory:
   ```bash
   git clone https://github.com.git
   cd RentSure_AI
   ```

2. Boot the Express Core Gateway Backend:
   ```bash
   cd server
   npm install
   cp .env.example .env  # Configure your local credentials
   npm run dev
   ```

3. Spin up the FastAPI Machine Learning Worker:
   ```bash
   cd ../ai-service
   pip install -r requirements.txt
   uvicorn main:app --reload --port 8000
   ```

4. Launch the React Client UI:
   ```bash
   cd ../client
   npm install
   npm run dev
   ```

---

## 🧪 Terminal API Verification (cURL Proofs)

Verify backend connectivity and route validation independently using these curl commands:

### Create New User Identity
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"developer@rentsuredemo.com","password":"securePassword123"}'
```

### Post Geospatial Entity Mapping
```bash
curl -X POST http://localhost:5000/api/v1/properties \
  -H "Content-Type: application/json" \
  -d '{"title":"Premium Student Studio","address":{"full":"Near MNIT Campus","lat":26.8628,"lng":75.8092},"price":{"monthly":5000},"amenities":["WiFi","CCTV"]}'
```

### Direct Asynchronous Document Parsing Interface
```bash
curl -X POST http://localhost:8000/scan \
  -F "file=@sample_lease_contract.txt"
```

---

### 👨‍💻 Developed By
**Aakash Kumar**  
*Specialization: Full Stack Systems Engineering, Microservices Architecture, Intelligence Integration*  
Malaviya National Institute of Technology (MNIT) Jaipur  
*Department of Electronics & Communication Engineering*
