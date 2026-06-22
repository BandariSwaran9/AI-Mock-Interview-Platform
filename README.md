# AI Mock Interview Platform
A full-stack AI-powered mock interview platform that analyzes resumes and conducts personalized interview sessions using Google Gemini AI.
## Features
- User authentication (Register/Login)
- Resume upload with PDF text extraction
- AI-generated interview questions based on resume content
- AI-evaluated answers with scores and detailed feedback
- MongoDB Atlas cloud database integration
## Tech Stack
**Frontend:** React, Vite, Tailwind CSS, Axios, React Router
**Backend:** FastAPI (Python)
**Database:** MongoDB Atlas
**AI:** Google Gemini API
## Project Architecture
User -> React Frontend -> FastAPI Backend -> MongoDB Atlas
-> Gemini AI API
## How It Works
1. User registers and logs in
2. User uploads their resume (PDF)
3. Backend extracts text from the resume
4. Gemini AI generates 5 personalized interview questions
5. User answers each question
6. Gemini AI evaluates each answer and provides a score (out of 10) with feedback
7. Results page displays all scores and feedback
## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /auth/register | Register a new user |
| POST | /auth/login | Login existing user |
| POST | /resume/upload | Upload and parse resume PDF |
| GET | /interview/questions | Generate AI interview questions |
| POST | /interview/evaluate | Evaluate user answers with AI |
## Setup Instructions
### Backend
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
### Frontend
cd frontend
npm install
npm run dev
## Author
Bandari Swaran
