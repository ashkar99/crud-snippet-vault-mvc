/**
 * Snippet Controller
 * Handles CRUD operations for code snippets.
 */
import { Snippet } from '../models/Snippet.js'

export class SnippetController {
  /**
   * Displays a list of all snippets.
   */
  async index (req, res, next) {
    try {
      const snippets = await Snippet.find()
      res.render('snippets/index', { snippets })
    } catch (error) {
      next(error)
    }
  }
}