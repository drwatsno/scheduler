/**
 * AuthController
 * @description :: Server-side logic for manage user"s authorization
 */
"use strict";

const passport = require("passport");
/**
 * Triggers when user authenticates via passport
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Object} error Error object
 * @param {Object} user User profile
 * @param {Object} info Info if some error occurs
 * @private
 */
function _onPassportAuth(req, res, error, user, info) {
  if (error) return res.serverError(error);
  if (!user) return res.unauthorized(null, info && info.code, info && info.message);

  return res.ok({
    token: CipherService.createToken(user),
    user,
    expires: Math.round(sails.config.jwtSettings.expiresIn / 60 / 24 )
  });
}

module.exports = {
  /**
   * Sign up in system
   * @param {Object} req Request object
   * @param {Object} res Response object
   */
  signUp: function (req, res) {
    User.create(_.omit(req.allParams(), "id"))
      .then(function (user) {
        return {
          token: CipherService.createToken(user),
          user: user
        };
      })
      .then(res.created)
      .catch(res.serverError);
  },

  /**
   * Sign in by local strategy in passport
   * @param {Object} req Request object
   * @param {Object} res Response object
   */
  signIn: function (req, res) {
    passport.authenticate("local",
      _onPassportAuth.bind(this, req, res))(req, res);
  },

  /**
   * Log out
   * @param req
   * @param res
   */
  logout(req, res) {
    req.logout();
    res.redirect("/");
  }
};
