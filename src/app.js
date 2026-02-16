import express from 'express'
import session from 'express-session'
import flash from 'connect-flash'
import dotenv from 'dotenv'
import { connectDB } from './config/mongoose.js'
import { router } from './routes/router.js'

// Initialize Dotenv
dotenv.config()

// Connect to Database
connectDB()

const app = express()

// Core Middleware
app.use('/', router)
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// Session Configuration (Plain Session Storage)
const sessionOptions = {
  name: 'snippetapp_session',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
    sameSite: 'strict'
  }
}

if (app.get('env') === 'production') {
  app.set('trust proxy', 1)
  sessionOptions.cookie.secure = true
}

app.use(session(sessionOptions))

// Flash Messages & Global Variables
app.use(flash())

// Middleware to pass flash messages to all views
app.use((req, res, next) => {
  res.locals.success_message = req.flash('success')
  res.locals.error_message = req.flash('error')
  
  // Make the session user available to all views
  if (req.session.user) {
      res.locals.user = req.session.user
  } else {
      res.locals.user = null
  }
  
  next()
})

// Server Initialization
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})