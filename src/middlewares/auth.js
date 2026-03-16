import { Snippet } from '../models/Snippet.js'
/**
 * Authorization Middleware
 * Verifies if a user has an active, authenticated session.
 */

export const authorizeLoggedOn = (req, res, next) => {
  // Check if the session exists and a user object is attached
  if (!req.session || !req.session.user) {
    const error = new Error('Forbidden')
    error.status = 403
    return next(error)
  }
  // User is authenticated, proceed to the next middleware/controller
  next()
}

/**
 * Ownership Middleware
 * Verifies if the logged-in user is the actual creator of the snippet.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {string} next - The next middleware function.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 * @throws {Error} - Throws an error if the snippet does not exist or if the user does not own the snippet.
 */
export const authorizeOwnership = async (req, res, next) => {
  try {
    const snippet = await Snippet.findById(req.params.id)

    // Check if snippet exists
    if (!snippet) {
      const error = new Error('The snippet you requested does not exist.')
      error.status = 404
      return next(error)
    }

    // Check Ownership
    if (snippet.author.toString() !== req.session.user._id) {
      const error = new Error('403 Forbidden: You do not own this snippet.')
      error.status = 403
      return next(error)
    }
    req.snippetDoc = snippet
    next()
  } catch (error) {
    next(error)
  }
}
