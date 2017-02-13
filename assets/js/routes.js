module.exports = {
  "homepage": {
    "name": "homepage",
    "url": "/",
    "group": "mainMenu",
    "template": `<h1>Welcome to Scheduler!</h1>`,
  },
  "login": {
    "name": "login",
    "url": "/login",
    "group": "userMenuAnonymous",
    "controller": "AuthController",
    "templateUrl": "./templates/auth/index.html"
  }
};
