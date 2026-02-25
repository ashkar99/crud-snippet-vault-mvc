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
      const viewData = {
        snippets: (await Snippet.find().populate('author', 'username').sort({ createdAt: -1 }))
          .map(snippetDoc => snippetDoc.toObject())
      }
      res.render('snippets/index', { viewData })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Displays a specific snippet.
   */
  async show (req, res, next) {
    try {
      const snippetDoc = await Snippet.findById(req.params.id).populate('author', 'username')
      
      if (!snippetDoc) {
        const error = new Error('The snippet you requested does not exist.')
        error.status = 404
        return next(error)
      }

      const viewData = {
        snippet: snippetDoc.toObject()
      }

      res.render('snippets/show', { viewData })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Renders the form to create a new snippet.
   */
  async create (req, res, next) {
    try {
      res.render('snippets/create')
    } catch (error) {
      next(error)
    }
  }

  /**
   * Processes the snippet creation form.
   */
  async createPost (req, res, next) {
    try {
      const { title, content } = req.body

      // Create the snippet, securely attaching the session user's ID as the author
      const snippet = new Snippet({
        title: title,
        content: content,
        author: req.session.user._id
      })

      await snippet.save()

      // Redirect to the newly created snippet (PRG Pattern)
      res.redirect('.')
    } catch (error) {
      next(error)
    }
  }
}