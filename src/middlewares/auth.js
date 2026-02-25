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