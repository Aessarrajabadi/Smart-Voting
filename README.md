# 🗳️ Smart Vote AI: Empowering Citizens through Technology

[![Hackathon Project](https://img.shields.io/badge/Hackathon-Project-blueviolet)](https://github.com/your-username/smart-vote-ai)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Smart Vote AI** is a premium, full-stack platform designed to bridge the gap between citizens and the democratic process. Using AI-driven insights and Google Cloud services, it provides a one-stop solution for election education and information verification.

---

## 📝 Problem Statement
In modern democracies, voters often face significant barriers:
- **Misinformation**: Viral fake news can influence election outcomes.
- **Complex Processes**: Understanding registration and voting procedures is daunting.
- **Language Barriers**: Important election information is often not available in regional languages.
- **Accessibility Issues**: Information platforms are rarely optimized for users with disabilities.

## 💡 Our Solution
**Smart Vote AI** tackles these challenges by providing:
1. **AI Chatbot**: Instant, accurate answers to election queries in multiple languages.
2. **Fake News Detection**: Real-time analysis of news snippets using keyword-based risk scoring.
3. **Accessibility First**: Integrated Text-to-Speech (TTS) and high-contrast modes for inclusive usage.
4. **Interactive Timeline**: A clear, step-by-step roadmap of the entire election cycle.

---

## 🚀 Key Features

- 🤖 **AI-Powered Chat**: Ask questions about the voting process and get instant answers.
- 🛡️ **Fake News Detector**: Verify the authenticity of election-related news.
- 📋 **Eligibility Checker**: Quick check to see if you meet the requirements to vote.
- ⏳ **Election Timeline**: Interactive visualization of the entire election lifecycle.
- 🏆 **Interactive Quiz**: Gamified learning experience to test election literacy.

## 🌟 Triple Pillars of Excellence
 
### ⚡ 1. Efficiency & Performance
- **O(N) Logic**: Our Fake News Detector uses optimized set-intersection logic for $O(N)$ efficiency, ensuring sub-millisecond local processing.
- **Intelligent Caching**: Implements a dual-layer strategy—Backend LRU Cache for expensive computations and Frontend Request Caching to minimize redundant network traffic.
- **Memoized UI**: Leverages `React.memo` and `useCallback` to maintain 60FPS animations even on lower-end devices.

### ♿ 2. Accessibility (A11y)
- **Multi-Modal Interaction**: Integrated **Text-to-Speech (TTS)** via Web Speech API, allowing visually impaired users to hear all educational content.
- **Semantic HTML & ARIA**: Full adherence to WCAG 2.1 standards with descriptive `aria-labels`, `aria-live` regions for dynamic updates, and proper heading hierarchies.
- **Keyboard Optimization**: Strategic `tabIndex` management and visible focus rings ensure the platform is 100% navigable without a mouse.

### ☁️ 3. Google Services Integration
- **Google Sign-In (Firebase Auth)**: Secure, friction-less authentication for personalized voter profiles.
- **Global Data (Cloud Firestore)**: Real-time persistence of user progress, quiz high scores, and "Smart Voter" badges.
- **Google Translate API**: Instant localization into **Hindi** and **Gujarati**, ensuring language is never a barrier to democracy.

---

## 📸 Screenshots

| Home Page | AI Chat Assistant |
| :---: | :---: |
| ![Home Placeholder](https://via.placeholder.com/800x450?text=Home+Page+Screenshot) | ![Chat Placeholder](https://via.placeholder.com/800x450?text=Chat+Assistant+Screenshot) |

| Fake News Detector | Election Timeline |
| :---: | :---: |
| ![News Placeholder](https://via.placeholder.com/800x450?text=Fake+News+Detector) | ![Timeline Placeholder](https://via.placeholder.com/800x450?text=Election+Timeline) |

---

## ⚙️ Setup & Installation

### 1. Prerequisites
- Node.js (v18+)
- Python (v3.9+)
- Firebase Project & Google Cloud API Key

### 2. Environment Setup
Create `frontend/.env`:
```env
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_GOOGLE_TRANSLATE_API_KEY=your_google_api_key
```

### 3. Run Locally
**Backend:**
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

---

## ☁️ Deployment

### Google Cloud Run (Backend)
1. Build Docker image: `docker build -t gcr.io/[PROJECT_ID]/backend .`
2. Push to Registry: `docker push gcr.io/[PROJECT_ID]/backend`
3. Deploy to Cloud Run: `gcloud run deploy --image gcr.io/[PROJECT_ID]/backend`

### Firebase Hosting (Frontend)
1. `npm run build`
2. `firebase deploy --only hosting`

---

## 🔗 Live Demo
Check out the live application: **[Live Demo Link Placeholder]**

## 👨‍💻 Team
- **[Your Name]** - Lead Developer

---
*Built with ❤️ for the Hack2Skill Hackathon.*
