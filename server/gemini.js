import { GoogleGenerativeAI } from '@google/generative-ai'

function getModel() {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is missing')
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

 return genAI.getGenerativeModel({
  model: 'gemini-2.5-flash'
})
}

export async function analyzeResumeWithGemini(resumeText, jobDescription = '') {
  const model = getModel()
  if (!model) return fallbackAnalysis()

  const prompt = `
You are an expert ATS resume reviewer. Return only valid JSON.
Analyze this resume and optional job description.

Resume:
${resumeText.slice(0, 14000)}

Job description:
${jobDescription.slice(0, 6000)}

JSON shape:
{
  "strengths": ["..."],
  "weaknesses": ["..."],
  "missingSkills": ["..."],
  "careerRecommendations": ["..."],
  "improvementSuggestions": ["..."],
  "interviewReadiness": { "score": 0, "summary": "..." }
}`

  try {
  const result = await model.generateContent(prompt)
  const text = result.response.text()
  return parseJson(text, fallbackAnalysis())
} catch (error) {
  console.error('Gemini Error:', error)
  return fallbackAnalysis()
}
}

export async function generateResumeRewrite(content, targetRole = 'Software Engineer') {
  const model = getModel()
  if (!model) {
    return [
      `Built production-style features for a ${targetRole} portfolio project with measurable ownership and clear user impact.`,
    ]
  }

  const prompt = `Rewrite these resume bullets for a ${targetRole}. Return a JSON array of concise ATS-friendly bullets: ${content}`
  const result = await model.generateContent(prompt)
  return parseJson(result.response.text(), [])
}

export async function generateCoverLetter({ resumeText, targetRole, companyName }) {
  const model = getModel()
  if (!model) {
    return `Dear Hiring Team at ${companyName},\n\nI am excited to apply for the ${targetRole} role. My project experience includes full-stack development, AI integration, resume parsing, ATS scoring, and polished dashboard interfaces.\n\nSincerely,\nCandidate`
  }

  const prompt = `Write a concise customized cover letter for ${companyName} and the ${targetRole} role using this resume:\n${resumeText.slice(0, 8000)}`
  const result = await model.generateContent(prompt)
  return result.response.text()
}

export async function generateInterviewQuestions(resumeText, targetRole = 'Software Engineer') {
  const model = getModel()
  if (!model) {
    return [
      'Explain the architecture of your AI Resume Analyzer project.',
      'How did you secure file uploads and JWT authentication?',
      'How would you improve ATS scoring accuracy over time?',
    ]
  }

  const prompt = `Generate 8 interview questions for a ${targetRole} candidate based on this resume. Return JSON array only:\n${resumeText.slice(0, 8000)}`
  const result = await model.generateContent(prompt)
  return parseJson(result.response.text(), [])
}

function fallbackAnalysis() {
  return {
    strengths: ['Clear full-stack project scope', 'Good alignment with AI and resume parsing', 'Strong dashboard potential'],
    weaknesses: ['Add more quantified outcomes', 'Include more testing and deployment details'],
    missingSkills: ['Unit testing', 'CI/CD', 'System design'],
    careerRecommendations: ['Target full-stack internship roles', 'Add cloud deployment metrics', 'Document API architecture'],
    improvementSuggestions: ['Start bullets with action verbs', 'Mention measurable impact', 'Add keywords from each job description'],
    interviewReadiness: {
      score: 82,
      summary: 'Strong project narrative, with room to deepen architecture and testing answers.',
    },
  }
}

function parseJson(value, fallback) {
  try {
    const cleaned = value.replace(/```json|```/g, '').trim()
    return JSON.parse(cleaned)
  } catch {
    return fallback
  }
}
