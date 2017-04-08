/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  /**
   * Show profile of user with given id
   * @param {Object} request Request object
   * @param {Object} response Response object
     */
	profile(request, response) {
    const userId = request.param("id") || request.user.id;

    User.getUserById(userId).then(function (user) {
      return response.ok(user, "user/profile");
    }, (error) => response.serverError(error));
  }
};
