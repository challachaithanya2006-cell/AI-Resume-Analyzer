# AI Resume Analyzer

Premium SaaS-style AI Resume Analyzer built for internship portfolio demos.

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, Framer Motion, Recharts, Three.js
- Backend: Node.js, Express, Multer, pdf-parse, mammoth
- AI: Google Gemini API
- Database/Auth: MongoDB, Mongoose, JWT, bcrypt
- Deployment targets: Vercel for `client`, Render or Railway for `server`

## Features

- Landing page with animated 3D ATS visualization
- PDF and DOCX resume upload with validation and progress UI
- Resume parsing for contact details, skills, education, projects, experience, and certifications
- ATS scoring across skills, formatting, experience, and education
- Gemini-powered strengths, weaknesses, missing skills, recommendations, rewriting, cover letters, and interview questions
- Job role matching for frontend, backend, full stack, software engineer, and data analyst roles
- Resume vs job description keyword comparison
- Dashboard with circular progress, bar charts, pie charts, radar charts, and score history
- JWT authentication, saved analyses, and admin analytics API

## Local Setup

```bash
git clone https://github.com/challachaithanya2006-cell/ai-resume-analyzer.git
cd ai-resume-analyzer
```

### Client

```bash
cd client
npm install
npm run dev
```

### Server

```bash
cd server
npm install
copy .env.example .env
npm run dev
```

Update `server/.env` with:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
GEMINI_API_KEY=your_gemini_api_key
```

## API Routes

- `GET /api/health`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/resumes/analyze`
- `POST /api/resumes/match-jd`
- `GET /api/resumes/history`
- `POST /api/generate/rewrite`
- `POST /api/generate/cover-letter`
- `POST /api/generate/interview-questions`
- `GET /api/admin/stats`

## Resume Headline

AI Resume Analyzer | React, Node.js, Gemini AI, PDF Processing, ATS Scoring, Job Matching
