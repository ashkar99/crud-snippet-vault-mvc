/**
 * Snippet Controller
 * Handles CRUD operations for code snippets.
 */
import { Snippet } from '../models/Snippet.js'

export class SnippetController {
  /**
   * Displays a list of all snippets.
   * @param req
   * @param res
   * @param next
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
   * @param req
   * @param res
   * @param next
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
   * @param req
   * @param res
   * @param next
   */
  async create (req, res, next) {
    try {
      res.render('snippets/create')
    } catch (error) {
      next(error)
    }
  }

  /**
   * Processes the snippet creation form (Hardened with PRG and Flash).
   * @param req
   * @param res
   * @param next
   */
  async createPost (req, res, next) {
    try {
      const { title, content } = req.body

      const snippet = new Snippet({
        title,
        content,
        author: req.session.user._id
      })

      await snippet.save()

      // Flash success and redirect to the public feed
      req.session.flash = { type: 'success', text: 'Snippet successfully created!' }
      res.redirect('/snippets')
    } catch (error) {
      if (error.name === 'ValidationError') {
        req.session.flash = { type: 'danger', text: error.message }
        return res.redirect('./create')
      }
      next(error)
    }
  }

  async update (req, res, next) {
    try {
      // Document is already loaded and authorized by middleware!
      const viewData = { snippet: req.snippetDoc.toObject() }
      res.render('snippets/update', { viewData })
    } catch (error) {
      next(error)
    }
  }

  async updatePost (req, res, next) {
    try {
      req.snippetDoc.title = req.body.title
      req.snippetDoc.content = req.body.content

      // Only save if modified
      if (req.snippetDoc.isModified()) {
        await req.snippetDoc.save()
        req.session.flash = { type: 'success', text: 'Snippet updated successfully!' }
      } else {
        req.session.flash = { type: 'info', text: 'No changes were made.' }
      }

      res.redirect(`/snippets/${req.snippetDoc._id}`)
    } catch (error) {
      if (error.name === 'ValidationError') {
        req.session.flash = { type: 'danger', text: error.message }
        return res.redirect('./update')
      }
      next(error)
    }
  }

  async delete (req, res, next) {
    try {
      const viewData = { snippet: req.snippetDoc.toObject() }
      res.render('snippets/delete', { viewData })
    } catch (error) {
      next(error)
    }
  }

  async deletePost (req, res, next) {
    try {
      await req.snippetDoc.deleteOne()
      req.session.flash = { type: 'success', text: 'Snippet was permanently deleted.' }
      res.redirect('/snippets')
    } catch (error) {
      next(error)
    }
  }
}
