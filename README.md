# Election Education AI Assistant

A full-stack web application designed to educate citizens about the election process. It includes an eligibility checker, an AI chatbot for answering election queries, a fake news detector, and a step-by-step election timeline.

## Features
- **Frontend**: React.js, React Router, Framer Motion (for animations).
- **Backend**: Python Flask, Flask-Cors, Flask-Limiter, Flask-Talisman.
- **Security**: Input validation and rate limiting.
- **Accessibility**: High contrast UI, semantic HTML.

## Prerequisites
- Node.js & npm
- Python 3.x

## Project Structure
- `/frontend` - Contains the React web application.
- `/backend` - Contains the Flask REST API and unit tests.

## Setup Instructions

### Backend (Python Flask)
1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the API tests:
   ```bash
   pytest tests/test_api.py
   ```
5. Start the backend server:
   ```bash
   python app.py
   ```
   The API will run on `http://127.0.0.1:5000`.

### Frontend (React + Vite)
1. Open a new terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the application in your browser (usually `http://localhost:5173`).

## Google Firebase Deployment

### Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login to Firebase: `firebase login`
3. Initialize Firebase in the `frontend` directory: `firebase init hosting`
   - Select your project.
   - Use `dist` as the public directory.
   - Configure as a single-page app (Yes).
4. Build the app: `npm run build`
5. Deploy: `firebase deploy --only hosting`

## Built for Hackathons
This project follows modular architecture, implements basic security measures (rate-limiting, input sanitization), and uses a modern, responsive, and accessible UI.
