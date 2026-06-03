export const atsBreakdown = [
  { name: 'Skills Score', value: 94 },
  { name: 'Formatting Score', value: 88 },
  { name: 'Experience Score', value: 86 },
  { name: 'Education Score', value: 92 },
]

export const jobMatches = [
  {
    title: 'Full Stack Developer',
    match: 92,
    missing: ['Docker', 'Unit testing'],
    reason: 'Strong React, Node.js, MongoDB, API, and deployment alignment.',
  },
  {
    title: 'Frontend Developer',
    match: 89,
    missing: ['Accessibility audits', 'Storybook'],
    reason: 'Excellent React, component design, Tailwind, and charting skills.',
  },
  {
    title: 'Software Engineer',
    match: 84,
    missing: ['System design', 'CI pipelines'],
    reason: 'Good project scope, API work, authentication, and product thinking.',
  },
  {
    title: 'Backend Developer',
    match: 78,
    missing: ['Caching', 'Message queues'],
    reason: 'Solid Express, JWT, MongoDB, parsing, and AI integration exposure.',
  },
  {
    title: 'Data Analyst',
    match: 71,
    missing: ['SQL dashboards', 'Python analytics'],
    reason: 'Charts and scoring logic fit, but analytics tooling can improve.',
  },
]

export const keywordData = [
  { name: 'Matched', value: 34, fill: '#06B6D4' },
  { name: 'Missing', value: 7, fill: '#F59E0B' },
  { name: 'Weak', value: 5, fill: '#F43F5E' },
]

export const history = [
  { month: 'Jan', score: 62, match: 54 },
  { month: 'Feb', score: 68, match: 61 },
  { month: 'Mar', score: 74, match: 70 },
  { month: 'Apr', score: 81, match: 78 },
  { month: 'May', score: 87, match: 84 },
  { month: 'Jun', score: 91, match: 88 },
]

export const skillRadar = [
  { skill: 'React', score: 94 },
  { skill: 'Node', score: 88 },
  { skill: 'MongoDB', score: 80 },
  { skill: 'AI APIs', score: 86 },
  { skill: 'Cloud', score: 72 },
  { skill: 'Testing', score: 65 },
]

export const rewriteBullets = [
  {
    before: 'Made a resume analyzer website using React and Node.',
    after:
      'Built an AI resume analysis platform with React, Express, Gemini API, PDF parsing, ATS scoring, and job role matching workflows.',
  },
  {
    before: 'Worked on user login and upload feature.',
    after:
      'Implemented JWT authentication, secure resume uploads, file validation, and protected analysis history using MongoDB models.',
  },
]

export const features = [
  {
    title: 'Resume Upload',
    copy: 'Validated PDF and DOCX uploads with progress feedback and resume preview.',
    accent: 'cyan',
  },
  {
    title: 'Parsing Engine',
    copy: 'Extract name, email, phone, skills, projects, education, experience, and certifications.',
    accent: 'indigo',
  },
  {
    title: 'ATS Score',
    copy: 'Overall score plus skills, formatting, education, and experience sub-scores.',
    accent: 'emerald',
  },
  {
    title: 'Gemini AI Review',
    copy: 'Strengths, weaknesses, missing skills, recommendations, and interview readiness.',
    accent: 'violet',
  },
  {
    title: 'JD Matcher',
    copy: 'Keyword match percentage, missing keywords, and targeted role recommendations.',
    accent: 'amber',
  },
  {
    title: 'Writing Studio',
    copy: 'Resume bullet rewriting, cover letters, action verbs, and ATS-friendly phrasing.',
    accent: 'rose',
  },
]

export const testimonials = [
  {
    name: 'Placement Mentor',
    role: 'Career Coach',
    quote:
      'This feels closer to a product demo than a college mini project. The dashboard makes the value clear fast.',
  },
  {
    name: 'Recruiter Preview',
    role: 'Talent Team',
    quote:
      'The role matching and ATS breakdown would be easy to discuss in an internship interview.',
  },
]

export const faqs = [
  {
    question: 'Does the app support real resume files?',
    answer:
      'Yes. The backend includes Multer uploads and parsing support for PDF and DOCX files through pdf-parse and mammoth.',
  },
  {
    question: 'Where does Gemini fit?',
    answer:
      'Gemini receives structured resume text and returns strengths, weaknesses, missing skills, recommendations, rewrites, cover letters, and interview readiness feedback.',
  },
  {
    question: 'Can this be deployed?',
    answer:
      'Yes. The client is Vercel-ready and the Express API can be deployed to Render or Railway with MongoDB Atlas and Gemini environment variables.',
  },
]
