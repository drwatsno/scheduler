const appScheduler = require("../app");
const routes = require("../routes.js");

appScheduler.factory("routes", function () {
  return Object.keys(routes).map(route => routes[route]);
});
