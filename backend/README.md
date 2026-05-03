# Election Education AI Assistant - Backend

This is the Python Flask backend for the "Election Education AI Assistant". It provides REST APIs for checking voter eligibility, an AI-powered chatbot (rule-based), and a fake news detector.

## Features
- **Modular Structure**: Clean separation of routes, business logic (`services.py`), and utilities (`utils.py`).
- **Input Validation**: Sanitization and validation for all incoming requests.
- **Security**: 
  - Rate limiting using `Flask-Limiter`.
  - Secure headers using `Flask-Talisman`.
  - CORS support for frontend integration.
- **Unit Testing**: Full test suite using `pytest`.

## APIs

### 1. Eligibility Checker
- **Endpoint**: `/eligibility`
- **Method**: `POST`
- **Payload**: `{"age": 20, "citizenship": "Indian"}`
- **Response**: `{"eligible": true, "message": "..."}`

### 2. AI Chat Assistant
- **Endpoint**: `/chat`
- **Method**: `POST`
- **Payload**: `{"message": "How to register?"}`
- **Response**: `{"reply": "..."}`

### 3. Fake News Detector
- **Endpoint**: `/fake-news`
- **Method**: `POST`
- **Payload**: `{"text": "Breaking: Election cancelled!"}`
- **Response**: `{"is_fake": true, "confidence": 0.85, "message": "..."}`

## Setup Instructions

### 1. Install Dependencies
It is recommended to use a virtual environment.
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Run the Application
```bash
python app.py
```
The server will start on `http://127.0.0.1:5000`.

### 3. Run Tests
```bash
pytest tests/test_api.py
```

## Security Measures
- **Rate Limiting**: Limits users to 10-20 requests per minute per endpoint to prevent abuse.
- **Sanitization**: All text inputs are stripped of HTML tags and trimmed.
- **Validation**: Strict validation for age and citizenship inputs.
