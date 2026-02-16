/**
 * Account Controller
 * Handles registration and login.
 */
import { User } from '../models/User.js'

export class AccountController {
  /**
   * Renders the registration form.
   */
  async register(req, res, next) {
    res.render('account/register')
  }

  async registerPost (req, res, next) {
    try {
      const { username, password } = req.body

      const user = new User({
        username: username,
        password: password
      })

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
}