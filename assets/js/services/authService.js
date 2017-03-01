const appScheduler = require("../app");
const cookie = require("js-cookie");

appScheduler.service("authService", ["io", function (io) {

  this.isAuthenticated = !!cookie.get("token") || false;
  this.token = cookie.get("token") || null;
  this.user = cookie.getJSON("user") || null;

  /**
   * Log in with creds and set JWT to cookies
   * @param creds {Object} user password and e-mail
   * @returns {Promise}
   */
  this.logIn = function (creds) {
    return new Promise(function (resolve, reject) {
      io.socket.post("/login", {email: creds.email, password: creds.password}, function (resData, jwRes) {
        console.log(resData);
        try {
          if (!resData.message) {
            cookie.set("token", resData.token, {expires: resData.expires});
            cookie.set("user", resData.user, {expires: resData.expires});
            resolve(resData);
          } else {
            reject(resData.message);
          }
        } catch (error) {
          reject(error);
        }
      });
    });
  };

  /**
   * Sign up user with creds
   * @param creds {Object} user e-mail and password
   * @returns {Promise}
   */
  this.signUp = function (creds) {
    return new Promise (function (resolve, reject) {
      io.socket.post("/signup", {email: creds.email, password: creds.password}, function (resData, jwRes) {
        console.log(resData);
        try {
          if (!resData.message) {
            cookie.set("token", resData.token, {expires: resData.expires});
            cookie.set("user", resData.user, {expires: resData.expires});
            resolve(resData);
          } else {
            reject(resData.message);
          }
        } catch (error) {
          reject(error);
        }
      });
    });
  };

  this.logOut = function () {
    return new Promise(function (resolve, reject) {
      try {
        cookie.remove("token");
        cookie.remove("user");
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };
}]);
