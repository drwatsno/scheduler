const appScheduler = require("../app");
const cookie = require("js-cookie");

appScheduler.service("authService", ["io", function (io) {

  const service = this;

  Object.defineProperty(service, "isAuthenticated", {
      enumerable: true,
      configurable: false,
      get: () => !!cookie.get("token")
  });

  Object.defineProperty(service, "token", {
    enumerable: true,
    get: () => cookie.get("token"),
    set: value => {
      if (!value) {
        return cookie.remove("token");
      }
      return cookie.set("token", value.token, value.expires);
    }
  });

  Object.defineProperty(service, "user", {
    enumerable: true,
    get: () => cookie.getJSON("user") || null,
    set: value => {
      if (!value) {
        return cookie.remove("user");
      }
      return cookie.set("user", value.user, value.expires);
    }
  });

  /**
   * Log in with creds and set JWT to cookies
   * @param creds {Object} user password and e-mail
   * @returns {Promise}
   */
  service.logIn = function (creds) {
    return new Promise(function (resolve, reject) {
      io.socket.post("/login", {email: creds.email, password: creds.password}, function (resData) {
        try {
          if (!resData.message) {
            service.token = {token: resData.token, expires: resData.expires};
            service.user = {user: resData.user, expires: resData.expires};
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
  service.signUp = function (creds) {
    return new Promise (function (resolve, reject) {
      io.socket.post("/signup", {email: creds.email, password: creds.password}, function (resData) {
        try {
          if (!resData.message) {
            service.token = {token: resData.token, expires: resData.expires};
            service.user = {user: resData.user, expires: resData.expires};
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
   * Delete token and user data from cookies
   * @returns {Promise}
   */
  service.logOut = function () {
    return new Promise(function (resolve, reject) {
      try {
        service.token = null;
        service.user = null;
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };
}]);
