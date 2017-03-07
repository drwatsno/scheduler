module.exports = {
  "calendar": {
    "name": "calendar",
    "url": "/",
    "group": "mainMenu",
    "controller": "CalendarController",
    "template": require("./templates/calendar/index.html")
  },
  "login": {
    "name": "login",
    "url": "/login",
    "group": "userMenu",
    "controller": "AuthController",
    "template": require("./templates/auth/index.html")
  },
  "signup": {
    "name": "signup",
    "url": "/signup",
    "group": "userMenu",
    "controller": "AuthController",
    "template": require("./templates/auth/index.html")
  }
};
