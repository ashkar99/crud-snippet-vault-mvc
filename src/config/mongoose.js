/**
 * Mongoose Connection Configuration
 * Handles the database connection lifecycle.
 */

import mongoose from 'mongoose'

/**
 * Establishes a connection to a database.
 *
 * @returns {Promise} Resolves to the connection object.
 */
export const connectDB = async () => {
  const { CONNECTION_STRING } = process.env

  try {
    mongoose.set('strictQuery', false)

    // Monitor connection events
    mongoose.connection.on('connected', () => console.log('Mongoose connection is open.'))
    mongoose.connection.on('error', (err) => console.error(`Mongoose connection error: ${err}`))
    mongoose.connection.on('disconnected', () => console.log('Mongoose connection is disconnected.'))

    // Handle application termination
    process.on('SIGINT', () => {
      mongoose.connection.close(() => {
        console.log('Mongoose connection disconnected due to application termination.')
        process.exit(0)
      })
    })

    return await mongoose.connect(CONNECTION_STRING)
  } catch (error) {
    console.error('Database connection failed:', error)
    process.exit(1)
  }
}