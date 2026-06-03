import fs from 'node:fs/promises'
import mongoose from 'mongoose'
import { analyzeResumeWithGemini } from '../gemini.js'
import ResumeAnalysis from '../models/ResumeAnalysis.js'
import { extractResumeFields, parseResumeFile } from '../utils/parser.js'
import { compareJobDescription, matchRoles, scoreResume } from '../utils/scoring.js'

export async function analyzeResume(req, res, next) {
  try {
    if (!req.file) {
      const error = new Error('Resume file is required')
      error.statusCode = 400
      throw error
    }

    const resumeText = await parseResumeFile(req.file)
    const extracted = extractResumeFields(resumeText)
    const scores = scoreResume(extracted)
    const roleMatches = matchRoles(resumeText)
    const aiAnalysis = await analyzeResumeWithGemini(resumeText, req.body.jobDescription || '')

    const payload = {
      fileName: req.file.originalname,
      extracted,
      scores,
      roleMatches,
      aiAnalysis,
      jobDescription: req.body.jobDescription || '',
    }

    if (req.user && mongoose.connection.readyState === 1) {
      await ResumeAnalysis.create({ ...payload, user: req.user._id })
    }

    res.status(201).json(payload)
  } catch (error) {
    next(error)
  } finally {
    if (req.file?.path) {
      await fs.rm(req.file.path, { force: true }).catch(() => {})
    }
  }
}

export async function matchJobDescription(req, res, next) {
  try {
    const { resumeText, jobDescription } = req.body
    if (!resumeText || !jobDescription) {
      const error = new Error('resumeText and jobDescription are required')
      error.statusCode = 400
      throw error
    }

    res.json(compareJobDescription(resumeText, jobDescription))
  } catch (error) {
    next(error)
  }
}

export async function getHistory(req, res, next) {
  try {
    if (mongoose.connection.readyState !== 1) {
      res.json({ analyses: [] })
      return
    }
    const analyses = await ResumeAnalysis.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(20)
    res.json({ analyses })
  } catch (error) {
    next(error)
  }
}
