/**
 * The entry point of the application.
 */

import express from 'express'
import session from 'express-session'
import flash from 'connect-flash'
import dotenv from 'dotenv'
import expressLayouts from 'express-ejs-layouts'
import { connectDB } from './config/mongoose.js'
import { router } from './routes/router.js'

dotenv.config()
connectDB()

const app = express()

// Core Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.set('view engine', 'ejs')
app.set('views', 'src/views') 
app.use(expressLayouts)
app.set('layout', 'layouts/default')

// Session Configuration
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

app.use((req, res, next) => {
  res.locals.success_message = req.flash('success')
  res.locals.error_message = req.flash('error')
  res.locals.flash = req.session.flash // Catch standard session flashes
  delete req.session.flash
  res.locals.user = req.session.user || null
  next()
})

app.use('/', router)

// Error Handlers
app.use((err, req, res, next) => {
  if (err.status === 403) {
    return res.status(403).send('403 Forbidden: You must be logged in to view this resource.')
  }
  res.status(err.status || 500).send(err.message || 'Internal Server Error')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})