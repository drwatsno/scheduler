/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

module.exports = {
	profile: function (req, res) {
    var userId = req.param("id")||req.user.id;
    User.getUserById(userId).then(function (user) {
      res.ok(user,'user/profile')
    },function (error) {
      res.serverError(error);
    });
  },
  events: function (req, res) {
    var userName = req.param("username")||req.user.name;
    
    User.getEventsByUserName(userName).then(function (events) {
      res.ok(events,'event/index')
    }, function (error) {
      res.serverError(error);
    })
  }
};
