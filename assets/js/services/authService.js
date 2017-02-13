const appScheduler = require("../app");
const cookie = require("js-cookie");

appScheduler.service("authService", ["io", function (io) {

  this.isAuthenticated = !!cookie.get("token") || false;
  this.token = cookie.get("token") || null;
  this.user = cookie.getJSON("user") || null;

  this.logIn = function (creds) {
    io.socket.post("/login", {email: creds.email, password: creds.password}, function (resData, jwRes) {
      console.log(resData);
      try {
        if (!resData.message) {
          cookie.set("token", resData.token, {expires: resData.expires});
          cookie.set("user", resData.user, {expires: resData.expires});
          // success
        } else {
          // err
        }
      } catch (error) {
        // err
      }
    });
  };

  this.signUp = function (creds) {
    io.socket.post("/signup", {email: creds.email, password: creds.password}, function (resData, jwRes) {
      console.log(resData);
      try {
        if (!resData.message) {
          cookie.set("token", resData.token, {expires: resData.expires});
          cookie.set("user", resData.user, {expires: resData.expires});
          //success
        } else {
          //err
        }
      } catch (error) {
        //err
      }
    });
  };

  this.logOut = function () {
    cookie.remove("token");
    cookie.remove("user");
  };
}]);
