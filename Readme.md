# API Key Management Service (FastAPI)

A production-style backend service built using FastAPI that allows developers to generate, manage, and authenticate API keys for secure access to protected APIs.

This project demonstrates backend engineering skills such as authentication, middleware design, secure key storage, and access control — similar to systems used by platforms like Stripe, OpenAI, and AWS.

---

# Problem Statement

Modern applications expose APIs that must be accessed securely by external clients such as frontend apps, mobile apps, or third-party services. These clients require a secure authentication mechanism that is:

* programmatic (no manual login required)
* revocable
* trackable
* secure

This service provides a complete API key lifecycle management system that enables secure API access.

---

# Features (MVP)

* User signup and login using JWT authentication
* Generate secure API keys
* Store API keys securely using hashing
* Authenticate requests using API keys
* Revoke API keys
* Protect endpoints using middleware-based API key validation
* Production-ready modular architecture

---

# Tech Stack

* FastAPI
* PostgreSQL
* SQLAlchemy
* JWT Authentication
* Pydantic
* Python

Optional (future improvements):

* Redis (caching, rate limiting)
* Docker
* Background tasks
* Usage analytics

---

# Architecture Overview

Client request flow:

Client → FastAPI → API Key Middleware → Database → Protected Resource

Authentication flow:

User login → receive JWT → create API key → use API key to access protected endpoints

---

# Project Structure

```
app/
├── main.py
├── routes/
│   ├── auth.py
│   ├── api_keys.py
│   └── protected.py
│
├── models/
│   ├── user.py
│   └── api_key.py
│
├── schemas/
│   ├── user_schema.py
│   └── api_key_schema.py
│
├── middleware/
│   └── api_key_middleware.py
│
├── core/
│   ├── security.py
│   └── config.py
│
├── db/
│   └── session.py
```

---

# API Endpoints

## Auth

### Signup

```
POST /auth/signup
```

### Login

```
POST /auth/login
```

Returns JWT token.

---

## API Key Management

### Create API Key

```
POST /api-keys
Authorization: Bearer <jwt_token>
```

Response:

```
{
  "api_key": "sk_live_xxxxxxxxx"
}
```

---

### Get All API Keys

```
GET /api-keys
Authorization: Bearer <jwt_token>
```

---

### Revoke API Key

```
DELETE /api-keys/{id}
Authorization: Bearer <jwt_token>
```

---

## Protected Endpoint

Example protected endpoint:

```
GET /protected
x-api-key: sk_live_xxxxxxxxx
```

Middleware validates API key before allowing access.

---

# Security Implementation

* API keys are generated using secure random functions
* API keys are hashed before storing in database
* Raw API keys are never stored
* Middleware validates API key on each request
* JWT authentication used for user identity

---

# Example Use Case

Example request:

```
GET /protected
x-api-key: sk_live_abcd1234
```

System flow:

1. Middleware extracts API key
2. Hashes and checks database
3. Validates active status
4. Allows access if valid
5. Rejects if invalid

---

# How to Run Locally

Install dependencies:

```
pip install -r requirements.txt
```

Run server:

```
uvicorn app.main:app --reload
```

Server runs at:

```
http://localhost:8000
```

Swagger docs available at:

```
http://localhost:8000/docs
```

---

# Why This Project Matters

This project replicates real-world backend infrastructure used in SaaS platforms to secure API access.

It demonstrates:

* FastAPI backend architecture
* Middleware-based authentication
* Secure API key handling
* JWT authentication
* Database design and access control

---

# Future Improvements

* Rate limiting using Redis
* API key usage analytics
* Expiring API keys
* Role-based access control
* Docker deployment
* Distributed caching

---

# Author

Ankit Mohanty
Backend Developer | FastAPI | Node.js | System Design
