import { Router } from 'express'
import { coverLetter, interviewQuestions, rewriteResume } from '../controllers/generatorController.js'

const router = Router()

router.post('/rewrite', rewriteResume)
router.post('/cover-letter', coverLetter)
router.post('/interview-questions', interviewQuestions)

export default router
