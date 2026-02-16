/**
 * Account Controller
 * Handles registration and login.
 */
import { User } from '../models/User.js'

export class AccountController {
  /**
   * Renders the registration form.
   */
  async register (req, res, next) {
    res.render('account/register')
  }

  /**
   * Processes the registration form.
   */
  async registerPost (req, res, next) {
    try {
      const { username, password } = req.body

      const user = new User({
        username: username,
        password: password
      })

      await user.save()

      res.redirect('/login')
    } catch (error) {
      next(error)
    }
  }
}