
/**
 * https://blog.thesparktree.com/creating-a-sails-application-using-passport
 */
module.exports = function (req, res, next) {

  if (req.session && req.session.userId) {
    next()
  } else {
    return res.redirect('/login');
  }
}