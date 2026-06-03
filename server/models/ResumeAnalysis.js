import mongoose from 'mongoose'

const resumeAnalysisSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    fileName: { type: String, required: true },
    extracted: { type: Object, required: true },
    scores: { type: Object, required: true },
    roleMatches: { type: Array, default: [] },
    aiAnalysis: { type: Object },
    jobDescription: { type: String },
  },
  { timestamps: true }
)

const ResumeAnalysis = mongoose.model('ResumeAnalysis', resumeAnalysisSchema)

export default ResumeAnalysis
