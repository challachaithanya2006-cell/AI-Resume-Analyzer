import mongoose from 'mongoose'
import ResumeAnalysis from '../models/ResumeAnalysis.js'
import User from '../models/User.js'

export async function getAdminStats(_req, res, next) {
  try {
    if (mongoose.connection.readyState !== 1) {
      res.json({
        users: 0,
        uploads: 0,
        averageScore: 0,
        recentAnalyses: [],
      })
      return
    }

    const [users, uploads, recentAnalyses] = await Promise.all([
      User.countDocuments(),
      ResumeAnalysis.countDocuments(),
      ResumeAnalysis.find().sort({ createdAt: -1 }).limit(10),
    ])
    const scoreAgg = await ResumeAnalysis.aggregate([
      { $group: { _id: null, averageScore: { $avg: '$scores.overall' } } },
    ])

    res.json({
      users,
      uploads,
      averageScore: Math.round(scoreAgg[0]?.averageScore || 0),
      recentAnalyses,
    })
  } catch (error) {
    next(error)
  }
}
