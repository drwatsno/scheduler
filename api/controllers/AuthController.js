/**
 * AuthController
 *
 * @description :: Server-side logic for managing authorisation
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

module.exports = {

  _config: {
    actions: false,
    shortcuts: false,
    rest: false
  },
  /**
   * login user
   * @param req
   * @param res
     */
  login: function(req, res) {

    passport.authenticate('local', function(err, user, info) {
      if ((err) || (!user)) {
        return res.send({
          message: info.message,
          user: user
        });
      }
      req.logIn(user, function(err) {
        if (err) res.send(err);
        res.redirect('/user');
      });

    })(req, res);
  },

  /**
   * logout
   * @param req
   * @param res
     */
  logout: function(req, res) {
    req.logout();
    res.redirect('/');
  }
};
