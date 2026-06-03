import mongoose from 'mongoose'

async function connectDB() {
  if (!process.env.MONGO_URI) {
    console.log('MONGO_URI not set. API will run without persistent history.')
    return null
  }

  try {
    const connection = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB connected: ${connection.connection.host}`)
    return connection
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`)
    throw error
  }
}

export default connectDB
