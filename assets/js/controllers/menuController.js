const appScheduler = require("../app");

appScheduler.controller("MenuController", ["routes", function(routes) {
  const vm = this;

  const menuGroups = [
    "mainMenu",
    "userMenu"
  ];

  vm.menu = {};

  menuGroups.forEach(groupName => vm.menu[groupName] = routes.filter(route => {
    return route.group === groupName;
  }));

}]);
