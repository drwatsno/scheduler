/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn"t match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don"t match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app"s 404 logic.
 *
 * Note: Sails doesn"t ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
   * etc. depending on your default view engine) your home page.              *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  "/": {
    view: "homepage"
  },

  "get /login": {
    view: "login"
  },

  "post /login": "AuthController.signIn",
  "/logout": "AuthController.logout",

  // Registration

  "get /signup": {
    view: "signup"
  },
  "post /signup": "AuthController.signUp",

  /***************************************************************************
   *                                                                          *
   * Custom routes here...                                                    *
   *                                                                          *
   * If a request to a URL doesn"t match any of the custom routes above, it   *
   * is matched against Sails route blueprints. See `config/blueprints.js`    *
   * for configuration options and examples.                                  *
   *                                                                          *
   ***************************************************************************/

  /***************************************************************************
   *                                                                          *
   *  User                                                                    *
   *                                                                          *
   ***************************************************************************/

  "get /user": "UserController.profile",
  "get /user/:id": "UserController.profile",
  "get /user/:username/events": "UserController.events",

  /***************************************************************************
   *                                                                          *
   *  Event                                                                   *
   *                                                                          *
   ***************************************************************************/

  "get /event/create": "EventController.create",
  "post /event/create": "EventController.create",
  "get /event/:id": "EventController.view",
  "get /event/:id/update": "EventController.update",
  "post /event/:id/update": "EventController.update",
  "get /event/:id/delete": "EventController.delete",
  "post /event/:id/delete": "EventController.delete",
  "get /event/:id/team": "EventController.team",
  "get /event/:id/team/add": "EventController.teamAddUser",
  "post /event/:id/team/add": "EventController.teamAddUser",
  "get /events": "EventController.index",

  /**************************************************************************
   *                                                                         *
   *  Track                                                                  *
   *                                                                         *
   **************************************************************************/

  "get /event/:eventid/track/create": "TrackController.create",
  "post /event/:eventid/track/create": "TrackController.create",
  "get /event/:eventid/track/:id": "TrackController.view",
  "get /event/:eventid/track/:id/update": "TrackController.update",
  "post /event/:eventid/track/:id/update": "TrackController.update",
  "get /event/:eventid/track/:id/delete": "TrackController.delete",
  "post /event/:eventid/track/:id/delete": "TrackController.delete",

  /**************************************************************************
   *                                                                         *
   *  Talk                                                                   *
   *                                                                         *
   **************************************************************************/

  "get /event/:eventid/track/:trackid/talk/create": "TalkController.create",
  "post /event/:eventid/track/:trackid/talk/create": "TalkController.create",
  "get /event/:eventid/track/:trackid/talk/:id": "TalkController.view",
  "get /event/:eventid/track/:trackid/talk/:id/update": "TalkController.update",
  "post /event/:eventid/track/:trackid/talk/:id/update": "TalkController.update",
  "get /event/:eventid/track/:trackid/talk/:id/delete": "TalkController.delete",
  "post /event/:eventid/track/:trackid/talk/:id/delete": "TalkController.delete",
  "get /event/:eventid/track/:trackid/talk/:id/speakers": "TalkController.speakers",
  "get /event/:eventid/track/:trackid/talk/:id/speakers/add": "TalkController.speakersAddUser",
  "post /event/:eventid/track/:trackid/talk/:id/speakers/add": "TalkController.speakersAddUser"
};
