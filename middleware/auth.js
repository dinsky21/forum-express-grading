const helpers = require('../helpers/auth-helpers')
const authenticated = (req, res, next) => {
  // if (req.isAuthenticated)
  if (helpers.ensureAuthenticated(req)) {
    return next()
  }
  res.redirect('/signin')
}
const authenticatedAdmin = (req, res, next) => {
  // if (req.isAuthenticated)
  if (helpers.ensureAuthenticated(req)) {
    if (helpers.getUser(req).isAdmin) return next()
    res.redirect('/')
  } else {
    res.redirect('/signin')
  }
}
const authenticatedCurrentUser = (req, res, next) => {
  if (helpers.getUser(req).id === Number(req.params.id)) {
    return next()
  }
  throw new Error('You cannot edit other user profile')
}
module.exports = {
  authenticated,
  authenticatedAdmin,
  authenticatedCurrentUser
}
