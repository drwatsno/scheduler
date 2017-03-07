/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
"use strict";
module.exports = {
  /**
   * Show profile of user with given id
   * @param {Object} req Request object
   * @param {Object} res Response object
     */
	profile(req, res) {
    let userId = req.param("id") || req.user.id;
    User.getUserById(userId).then(function (user) {
      return res.ok(user, "user/profile");
    }, (error) => res.serverError(error));
  },
  /**
   * Show user's events
   * @param {Object} req Request object
   * @param {Object} res Response object
     */
  events(req, res) {
    let userName = req.param("username") || req.user.name;
    User.getEventsByUserName(userName).then(function (events) {
      return res.ok(events, "event/index");
    }, (error) => res.serverError(error));
  }
};
