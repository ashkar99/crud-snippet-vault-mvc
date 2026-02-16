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
}