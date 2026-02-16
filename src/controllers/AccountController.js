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

  async registerPost(req, res, next) {
    try {
      const { username, password } = req.body

      const user = new User({
        username: username,
        password: password
      })

      await user.save()
      next()

    } catch (error) {
      // 11000 is the MongoDB error code for duplicate keys (unique constraint)
      if (error.code === 11000) {
        req.session.flash = { type: 'danger', text: 'Username is already taken.' }
        return res.redirect('./register')
      }

      // Handle Mongoose validation errors
      if (error.name === 'ValidationError') {
        req.session.flash = { type: 'danger', text: error.message }
        return res.redirect('./register')
      }

      next(error)
    }
  }
}