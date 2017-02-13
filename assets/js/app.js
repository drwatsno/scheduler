const routes = require("./routes.js");
const angular = require("angular");

const appScheduler = angular.module('appScheduler', [
  require('angular-ui-router')
]);

appScheduler.config(['$locationProvider', '$stateProvider', function($locationProvider, $stateProvider) {
  $locationProvider.html5Mode(true);

  Object.keys(routes).forEach(function (route) {
    $stateProvider.state(routes[route]);
  });
}]);

module.exports = appScheduler;
