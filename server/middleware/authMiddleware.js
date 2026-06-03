import jwt from 'jsonwebtoken'
import User from '../models/User.js'

function getToken(req) {
  const header = req.headers.authorization || ''
  if (header.startsWith('Bearer ')) return header.slice(7)
  return null
}

export async function protect(req, _res, next) {
  try {
    const token = getToken(req)
    if (!token) {
      const error = new Error('Authentication token required')
      error.statusCode = 401
      throw error
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret-change-me')
    const user = await User.findById(decoded.id).select('-password')
    if (!user) {
      const error = new Error('User not found')
      error.statusCode = 401
      throw error
    }

    req.user = user
    next()
  } catch (error) {
    error.statusCode = error.statusCode || 401
    next(error)
  }
}

export async function optionalAuth(req, _res, next) {
  try {
    const token = getToken(req)
    if (!token) return next()
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret-change-me')
    req.user = await User.findById(decoded.id).select('-password')
    return next()
  } catch {
    return next()
  }
}

export function adminOnly(req, _res, next) {
  if (req.user?.role === 'admin') return next()
  const error = new Error('Admin access required')
  error.statusCode = 403
  return next(error)
}
