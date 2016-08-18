/**
 * EventController
 *
 * @description :: Server-side logic for managing events
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  /**
   * list all User events
   * @param req
   * @param res
     */
  index: function (req, res) {
    return res.json({
      message: 'Event.index not implemented'
    });
  },

  /**
   * show one event
   * @param req
   * @param res
   * @returns {*}
     */
  view: function (req, res) {
    var eventId = req.param('id');

    return res.json({
      message: `(show event with id ${eventId}) Event.view not implemented`
    });
  },

  /**
   * show create event form
   * redirect to login if not authenticated
   * @param req
   * @param res
     */
  create: function (req, res) {
    if (req.isAuthenticated()) {
      res.view('event/create');
    } else {
      res.redirect('/login');
    }
  }
};

