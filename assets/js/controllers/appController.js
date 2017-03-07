const appScheduler = require("../app");

appScheduler.controller("AppController", ["authService", function(authService) {
  const vm = this;

  vm.auth = authService;

}]);
