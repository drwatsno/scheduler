const appScheduler = require("../app");
const angular = require("angular");

appScheduler.controller("AuthController", ["authService", "$state", function (authService, $state) {
  const vm = this;

  vm.error = null;

  vm.creds = {
    email: "",
    password: ""
  };

  vm.logIn = function () {
    authService.logIn(vm.creds)
      .then(function () {
        $state.go("homepage");
      })
      .catch(err => {
        vm.error = err;
      });
  };

}]);
