/**
 * Snippet Controller
 * Handles CRUD operations for code snippets.
 */
import { Snippet } from '../models/Snippet.js'

export class SnippetController {
  /**
   * Displays a list of all snippets.
   */
  async index(req, res, next) {
    try {
      const snippets = await Snippet.find()
      res.render('snippets/index', { snippets })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Displays a specific snippet.
   */
  async show(req, res, next) {
    try {
      const snippet = await Snippet.findById(req.params.id)

      if (!snippet) {
        const error = new Error('The snippet you requested does not exist.')
        error.status = 404
        return next(error)
      }

      res.render('snippets/show', { snippet })
    } catch (error) {
      next(error)
    }
  }
}