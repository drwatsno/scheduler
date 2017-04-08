const appScheduler = require("../app");
const cookie = require("js-cookie");

appScheduler.service("eventService", ["io", function (io) {

  const service = this;

  service.getEvents = function () {
    return new Promise(function (resolve, reject) {
      io.socket.get("/event", function (resData) {
        try {
          if (!resData.message) {
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
}]);
