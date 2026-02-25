/**
 * Account Controller
 * Handles registration, login, and logout.
 */
import { User } from '../models/User.js'

export class AccountController {
  async register (req, res, next) {
    res.render('account/register')
  }

  async registerPost (req, res, next) {
    try {
      const { username, password } = req.body
      const user = new User({ username, password })
      await user.save()

      req.session.flash = { type: 'success', text: 'Registration successful. Please login.' }
      res.redirect('/login')
    } catch (error) {
      if (error.code === 11000) {
        req.session.flash = { type: 'danger', text: 'Username is already taken.' }
        return res.redirect('./register')
      }
      if (error.name === 'ValidationError') {
        req.session.flash = { type: 'danger', text: error.message }
        return res.redirect('./register')
      }
      next(error)
    }
  }

  async login (req, res, next) {
    res.render('account/login')
  }

  async loginPost (req, res, next) {
    try {
      // Authenticate user credentials
      const userDoc = await User.authenticate(req.body.username, req.body.password)
      
      // Regenerate session to prevent Session Fixation attacks
      req.session.regenerate((err) => {
        if (err) {
          throw new Error('Failed to re-generate session.')
        }

        // Assign user to session
        req.session.user = {
          _id: userDoc._id,
          username: userDoc.username
        }

        // Flash success and redirect
        req.session.flash = { type: 'success', text: `Welcome back, ${userDoc.username}!` }
        res.redirect('/snippets') 
      })
    } catch (error) {
      req.session.flash = { type: 'danger', text: 'Invalid credentials.' }
      res.redirect('/login')
    }
  }

  async logout (req, res, next) {
    try {
      req.session.destroy((err) => {
        if (err) {
          throw new Error('Failed to destroy session.')
        }
        res.redirect('/')
      })
    } catch (error) {
      next(error)
    }
  }
}