import { Router } from 'express'
import { analyzeResume, getHistory, matchJobDescription } from '../controllers/resumeController.js'
import { optionalAuth, protect } from '../middleware/authMiddleware.js'
import upload from '../middleware/uploadMiddleware.js'

const router = Router()

router.post('/analyze', optionalAuth, upload.single('resume'), analyzeResume)
router.post('/match-jd', matchJobDescription)
router.get('/history', protect, getHistory)

export default router
