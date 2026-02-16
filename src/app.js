/**
 * The entry point of the application.
 */
import express from 'express'
import dotenv from 'dotenv'

// Initialize Dotenv
dotenv.config()

const app = express()

// Basic Configuration
app.use(express.urlencoded({ extended: true })) // Parse application/x-www-form-urlencoded
app.use(express.static('public')) // Serve static files

// Server Initialization
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
  console.log('Press Ctrl+C to terminate...')
})