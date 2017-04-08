/**
 * AuthController
 * @description :: Server-side logic for manage user"s authorization
 */
const passport = require("passport");
/**
 * Triggers when user authenticates via passport
 * @param {Object} request Request object
 * @param {Object} response Response object
 * @param {Object} error Error object
 * @param {Object} user User profile
 * @param {Object} info Info if some error occurs
 * @private
 */
function _onPassportAuth(request, response, error, user, info) {
  if (error) {
    return response.serverError(error);
  }

  if (!user) {
    return response.unauthorized(null, info && info.code, info && info.message);
  }

  return response.ok({
    user,
    token: CipherService.createToken(user),
    expires: Math.round(sails.config.jwtSettings.expiresIn / 60 / 24 )
  });
}

module.exports = {
  /**
   * Sign up in system
   * @param {Object} request Request object
   * @param {Object} response Response object
   */
  signUp: function (request, response) {
    User.create(_.omit(request.allParams(), "id"))
      .then(function (user) {
        return {
          token: CipherService.createToken(user),
          user: user
        };
      })
      .then(response.created)
      .catch(response.serverError);
  },

  /**
   * Sign in by local strategy in passport
   * @param {Object} request Request object
   * @param {Object} response Response object
   */
  signIn: function (request, response) {
    passport.authenticate("local",
      _onPassportAuth.bind(this, request, response))(request, response);
  }
};
