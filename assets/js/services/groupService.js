const appScheduler = require("../app");

appScheduler.service("groupService", ["authService", function (authService) {
  this.groups = {
    "mainMenu": {
      hideMenu: false
    },
    "userMenuAuthenticated": {
      hideMenu: !authService.isAuthenticated
    },
    "userMenuAnonymous": {
      hideMenu: authService.isAuthenticated
    }
  };

  this.getValue = function (groupName, value) {
    return this.groups[groupName].value;
  };
}]);
