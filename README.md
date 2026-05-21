<div align="center">

# 🏠 RentSure AI

### Student Housing Verification & Contract Analysis Platform

A full-stack MERN + FastAPI application that helps students discover nearby rental properties, verify landlord trust metrics, and analyze rental agreements using OCR-based contract scanning.

<br>

![React](https://img.shields.io/badge/Frontend-React-blue?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green?style=for-the-badge&logo=node.js)
![FastAPI](https://img.shields.io/badge/Microservice-FastAPI-teal?style=for-the-badge&logo=fastapi)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-darkgreen?style=for-the-badge&logo=mongodb)
![JWT](https://img.shields.io/badge/Auth-JWT-orange?style=for-the-badge)

</div>

---

# 📌 Overview

RentSure AI is designed to simplify student housing verification by combining:

- 🗺️ Geospatial property search
- 🔐 Secure JWT authentication
- 📄 OCR-based contract scanning
- ⭐ Trust & safety scoring
- ⚡ FastAPI microservice integration

The platform uses a MERN stack backend for user management and property operations, while a separate Python FastAPI service handles PDF parsing and contract analysis.

---

# 🏗️ System Architecture

```text
                 ┌────────────────────┐
                 │   React Frontend   │
                 └─────────┬──────────┘
                           │
                    HTTP Requests
                           │
                 ┌─────────▼──────────┐
                 │ Express.js Backend │
                 └─────────┬──────────┘
                           │
        ┌──────────────────┴──────────────────┐
        │                                     │
        ▼                                     ▼
┌───────────────┐                   ┌────────────────┐
│   MongoDB     │                   │ FastAPI OCR    │
│ Geospatial DB │                   │ Microservice   │
└───────────────┘                   └────────────────┘
```

---

# 🚀 Features

## 🔐 Authentication & Security
- JWT-based authentication
- Protected API routes
- Password hashing using bcrypt
- API rate limiting
- Secure HTTP headers with Helmet.js

## 🏠 Property Management
- Add and manage rental listings
- Geospatial nearby-property search
- Trust & safety score generation
- Property filtering and discovery

## 📄 OCR Contract Scanner
- Upload rental agreements in PDF format
- Extract text using Python PDF parsing
- Detect risky or suspicious clauses
- Return structured risk analysis

## ⚡ Backend Engineering
- RESTful API architecture
- Node.js ↔ FastAPI integration
- Modular Express middleware structure
- MongoDB 2dsphere indexing

---

# 🛠️ Tech Stack

| Layer | Technologies |
|------|------|
| Frontend | React.js, Vite, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| AI Service | Python, FastAPI, PyPDF2 |
| Security | JWT, bcrypt, Helmet.js |
| Dev Tools | Git, Postman |

---

# 📂 Folder Structure

```bash
rentsure-ai/
│
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── services/
│   └── vite.config.js
│
├── server/                 # Express Backend
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── services/
│   └── server.js
│
├── ai-service/             # FastAPI OCR Service
│   ├── main.py
│   └── requirements.txt
│
└── README.md
```

---

# 🔌 API Endpoints

## 🔑 Authentication APIs

| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/api/v1/auth/register` | Register new user |
| POST | `/api/v1/auth/login` | Login user |
| GET | `/api/v1/auth/me` | Get current user |

---

## 🏠 Property APIs

| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/api/v1/properties` | Get all properties |
| GET | `/api/v1/properties/nearby` | Get nearby properties |
| POST | `/api/v1/properties` | Create property listing |

---

## 📄 OCR Scanner APIs

| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/api/v1/contracts/scan` | Upload and scan contract |

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/rentsure-ai.git
cd rentsure-ai
```

---

## 2️⃣ Setup Backend

```bash
cd server
npm install
npm run dev
```

---

## 3️⃣ Setup FastAPI OCR Service

```bash
cd ../ai-service
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

---

## 4️⃣ Setup Frontend

```bash
cd ../client
npm install
npm run dev
```

---

# 🧪 Sample API Testing

## Register User

```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
-H "Content-Type: application/json" \
-d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

---

## Upload Contract

```bash
curl -X POST http://localhost:8000/scan \
-F "file=@sample_contract.pdf"
```

---

# 📚 Learning Outcomes

Through this project, I explored:

- Full-stack MERN development
- REST API architecture
- JWT authentication flow
- MongoDB geospatial indexing
- FastAPI microservices
- OCR/PDF text extraction
- Node.js ↔ Python backend integration
- API security middleware
- File upload handling

---

# 🎯 Future Improvements

- Cloud deployment
- AI-powered contract summarization
- Real-time chat system
- Property recommendation engine
- Advanced NLP risk analysis

---

# 👨‍💻 Developer

**Aakash Kumar**  
B.Tech — Electronics & Communication Engineering  
Malaviya National Institute of Technology Jaipur

---

<div align="center">

### ⭐ If you found this project useful, consider giving it a star.

</div>