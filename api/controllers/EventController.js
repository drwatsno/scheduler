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
      res.ok(events,'event/index')
    },function (error) {
      res.serverError(error);
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
      res.ok(event,'event/view');
    }, function (error) {
      res.serverError(error);
    })
  },

  /**
   * creates event
   * @param req
   * @param res
     */
  createEvent: function (req, res) {
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
  },

  showCreateForm: function (req, res) {
    res.view('event/create')
  }
};

