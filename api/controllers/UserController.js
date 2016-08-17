/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

module.exports = {
	view: function (req, res) {
    if (req.isAuthenticated()) {
      return res.view('user/profile',{
        // locals
      })
    } else {
      res.redirect('/');
    }
  }
};

