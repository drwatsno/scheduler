const appScheduler = require("../app");
const angular = require("angular");

appScheduler.controller("AuthController", ["authService", "$state", function (authService, $state) {
  const vm = this;

  switch ($state.current.name) {
    case "signup": {
     vm.state = "Signup";
    } break;

    case "login": {
      vm.state = "Login";
    } break;

    default: {
      vm.state = "Nostate";
    }
  }

  vm.error = null;

  vm.creds = {
    email: "",
    password: ""
  };

  vm.login = function () {
    authService.logIn(vm.creds)
      .then(function () {
        $state.go("calendar");
      })
      .catch(err => {
        vm.error = err;
      });
  };

  vm.signup = function () {
    authService.signUp(vm.creds)
      .then(function () {
        $state.go("calendar");
      })
      .catch(err => {
        vm.error = err;
      });
  };

  vm.action = function () {
    vm[$state.current.name].call();
  };

}]);
