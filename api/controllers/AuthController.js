/**
 * AuthController
 *
 * @description :: Server-side logic for managing authorisation
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
"use strict";

let passport = require("passport");

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
  login(req, res) {

    passport.authenticate("local", function (err, user, info) {
      if ((err) || (!user)) {
        return res.view("message", {
          message: {
            type: "error",
            name: "Login error",
            content: info.message
          }
        });
      }
      req.logIn(user, function (loginError) {
        if (loginError) {
          return res.serverError(loginError);
        }
        return res.view("message", {
          message: {
            type: "success",
            name: "Logged in successfully",
            content: `Successfully logged in as ${user.name}`,
            links: [
              {
                url: `/`,
                name: `Return to main`
              },
              {
                url: `/user`,
                name: `My profile`
              }
            ]
          }
        });
      });

    })(req, res);
  },

  /**
   * logout
   * @param req
   * @param res
   */
  logout(req, res) {
    req.logout();
    res.redirect("/");
  },

  /**
   * sign up
   * @param req
   * @param res
   */
  signUp(req, res) {
    User.create(req.body).exec(function (error, user) {

      if (error) {
        return res.serverError(error);
      }

      req.logIn(user, function (loginError) {
        if (loginError) {
          return res.serverError(loginError);
        }
        return res.view("message", {
          message: {
            type: "success",
            name: "Successfully signed up",
            content: `Registered user with name ${user.name} and email ${user.email}`,
            links: [
              {
                url: `/`,
                name: `Return to main`
              },
              {
                url: `/user`,
                name: `My profile`
              }
            ]
          }
        });
      });
    });
  }
};
