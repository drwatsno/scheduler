/**
 * EventController
 *
 * @description :: Server-side logic for managing events
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  /**
   * all events
   * @param {Object} req Request object
   * @param {Object} res Response object
   */
  index(req, res) {
    Event.getAllEvents().then(
      event => res.ok(event),
      error => res.serverError(error)
    );
  },

  /**
   * Single event
   * @param {Object} req Request object
   * @param {Object} res Response object
   */
  view(req, res) {
    const eventId = req.param("id") || null;

    Event.getEventById(eventId).then(
        event => res.ok(event),
        error => res.serverError(error)
      );
  },

  /**
   * creates event
   * @param {Object} req Request object
   * @param {Object} res Response object
   */
  create(req, res) {
    Event.create({
      name: req.body.name,
      startDate: req.body.start_date,
      endDate: req.body.end_date,
      owner: req.user.id
    })
      .then(
        event => res.ok(event),
        error => res.serverError(error)
      );
  },

  /**
   * Update event or show update event form
   * @param {Object} req Request object
   * @param {Object} res Response object
     */
  update(req, res) {
    Event.update({id: req.param("id")}, {
      name: req.body.name,
      startDate: req.body.start_date,
      endDate: req.body.end_date,
      owner: req.user.id
    })
      .then(
        event => res.ok(event),
        error => res.serverError(error)
      );
  },

  /**
   * Delete event
   * @param {Object} req Request object
   * @param {Object} res Response object
     */
  delete(req, res) {
    Event.destroy({id: req.param("id")})
      .then(
        event => res.ok(event),
        error => res.serverError(error)
      );
  },

  /**
   * Manages requests to team of event
   * @param {Object} req Request object
   * @param {Object} res Response object
   */
  team(req, res) {
    const eventId = req.param("id");

    Event.getEventTeam(eventId)
      .then(team => res.ok(team), error => res.serverError(error));
  },

  /**
   * Adds user to event team
   * @param req
   * @param res
   */
  teamAddUser(req, res) {
    const eventId = req.param("id");

    Event.addUserToTeam(eventId, req.body.userid)
      .then(event => res.created(event), error => res.serverError(error));
  }
};
