module.exports.routes = {

  "/": {
    view: "layout"
  },

  "post /login": "AuthController.signIn",
  "post /signup": "AuthController.signUp",

  "get /user": "UserController.profile",
  "get /user/:id": "UserController.profile",
};
