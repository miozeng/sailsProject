/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  post: async function (req, res) {
    const { email, password } = req.allParams()
    var userRecord = await User.findOne({ email: email });
    if (!userRecord) {
      sails.log.info('User is not logged in')
      return res.forbidden();
    }
    User.isValidPassword(password, userRecord, (error, isValid) => {
      if (error) return res.serverError(error)
      if (!isValid) return res.forbidden()

      sails.log.info('User logged in', user)
      req.session.userId = userRecord.id;

      return res.json({
        xToken: 'just test'//可能替换成其他信息比如accesstoken
      })
    })

  }

  /*
    login: function (req, res) {
  
  
      return res.json({
        todo: 'Not implemented yet!'
      });
    },*/

};