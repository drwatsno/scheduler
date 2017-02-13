const appScheduler = require("../app");

appScheduler.controller("MenuController", ["routes", "groupService", function(routes, groupService) {
  const vm = this;

  vm.getByGroup = function (groupName) {
    return routes.filter(route => {
      return route.group === groupName && !groupService.getValue(groupName, "hideMenu");
    });
  };

}]);
