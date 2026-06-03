import {
  generateCoverLetter,
  generateInterviewQuestions,
  generateResumeRewrite,
} from '../gemini.js'

export async function rewriteResume(req, res, next) {
  try {
    const { content, targetRole } = req.body
    if (!content) {
      const error = new Error('content is required')
      error.statusCode = 400
      throw error
    }
    const bullets = await generateResumeRewrite(content, targetRole)
    res.json({ bullets })
  } catch (error) {
    next(error)
  }
}

export async function coverLetter(req, res, next) {
  try {
    const { resumeText, targetRole, companyName } = req.body
    if (!resumeText || !targetRole || !companyName) {
      const error = new Error('resumeText, targetRole, and companyName are required')
      error.statusCode = 400
      throw error
    }
    const letter = await generateCoverLetter({ resumeText, targetRole, companyName })
    res.json({ letter })
  } catch (error) {
    next(error)
  }
}

export async function interviewQuestions(req, res, next) {
  try {
    const { resumeText, targetRole } = req.body
    if (!resumeText) {
      const error = new Error('resumeText is required')
      error.statusCode = 400
      throw error
    }
    const questions = await generateInterviewQuestions(resumeText, targetRole)
    res.json({ questions })
  } catch (error) {
    next(error)
  }
}
