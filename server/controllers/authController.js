import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import User from '../models/User.js'

export async function register(req, res, next) {
  try {
    ensureDatabase()
    const { name, email, password } = req.body
    if (!name || !email || !password) {
      const error = new Error('Name, email, and password are required')
      error.statusCode = 400
      throw error
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      const error = new Error('Email already registered')
      error.statusCode = 409
      throw error
    }

    const user = await User.create({ name, email, password })
    res.status(201).json(formatAuthResponse(user))
  } catch (error) {
    next(error)
  }
}

export async function login(req, res, next) {
  try {
    ensureDatabase()
    const { email, password } = req.body
    const user = await User.findOne({ email }).select('+password')
    if (!user || !(await user.comparePassword(password))) {
      const error = new Error('Invalid email or password')
      error.statusCode = 401
      throw error
    }

    res.json(formatAuthResponse(user))
  } catch (error) {
    next(error)
  }
}

export async function getMe(req, res) {
  res.json({ user: req.user })
}

function formatAuthResponse(user) {
  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token: jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'dev-secret-change-me', {
      expiresIn: '7d',
    }),
  }
}

function ensureDatabase() {
  if (mongoose.connection.readyState !== 1) {
    const error = new Error('MongoDB is not connected. Set MONGO_URI to enable authentication.')
    error.statusCode = 503
    throw error
  }
}
