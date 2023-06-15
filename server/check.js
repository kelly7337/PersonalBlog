// Check user login

module.exports = {
  checkLogin: function (req, res, next) {
    if (!req.session.user) {
      console.log('user does not log in')
      return req.redirect('/signin')
    }
    next()
  },

  checkNotLogin: function (req, res, next) {
    if (req.session.user) {
      console.log('user logged in')
      return req.redirect('/signin')
    }
    next()
  }
}