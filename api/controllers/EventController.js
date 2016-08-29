/**
 * EventController
 *
 * @description :: Server-side logic for managing events
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  /**
   * all events
   * @param req
   * @param res
     */
  index: function (req, res) {
    Event.getAllEvents().then(function (events) {
      return res.ok(events,'event/index')
    },function (error) {
      return res.serverError(error);
    })
  },

  /**
   * Single event
   * @param req
   * @param res
     */
  view: function (req, res) {
    var eventId = req.param("id")||null;

    Event.getEventById(eventId).then(function (event) {
      return res.ok(event,'event/view');
    }, function (error) {
      return res.serverError(error);
    })
  },

  /**
   * creates event
   * @param req
   * @param res
     */
  createEvent: function (req, res) {
    if (req.body) {
      Event.createWithOwner(req.body, req.user.id).then(
        function (event) {
          return res.created(event,{modelName:'event'});
        },
        function (error) {
          return res.serverError(error);
        })
        .catch(function (error) {
          return res.serverError(error);
        });
    } else {
      return res.view('event/create')
    }
  },

  /**
   * Manages requests to team of event
   * @param req
   * @param res
     */
  team: function (req, res) {
    var eventId = req.param('id');

    Event.getEventTeam(eventId).then(function (team) {
      return res.ok(team,'event/team/index');
    }, function (error) {
      return res.serverError(error);
    })
  },

  /**
   * Adds user to event team
   * @param req
   * @param res
     */
  teamAddUser: function (req, res) {
    var eventId = req.param('id');
    if (req.body) {
      Event.addUserToTeam(eventId,req.body.userid).then(function (event) {
        return res.created(event,{modelName:'event team'})
      },function (error) {
        if (error) {
          return res.serverEror(error);
        }
      })
    } else {
      return res.view('event/team/add')
    }
  }
};

