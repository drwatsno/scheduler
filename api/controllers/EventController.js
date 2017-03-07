/**
 * EventController
 *
 * @description :: Server-side logic for managing events
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
"use strict";

module.exports = {

  /**
   * all events
   * @param {Object} req Request object
   * @param {Object} res Response object
   */
  index(req, res) {
    Event.getAllEvents().then(function (events) {
      return res.ok(events, "event/index");
    }, function (error) {
      return res.serverError(error);
    });
  },

  /**
   * Single event
   * @param {Object} req Request object
   * @param {Object} res Response object
   */
  view(req, res) {
    let eventId = req.param("id") || null;

    Event.getEventById(eventId).then(function (event) {
      return res.ok(event, "event/view");
    }, function (error) {
      return res.serverError(error);
    });
  },

  /**
   * creates event
   * @param {Object} req Request object
   * @param {Object} res Response object
   */
  create(req, res) {
    if (req.body) {
      Event.create({
        name: req.body.name,
        startDate: req.body.start_date,
        endDate: req.body.end_date,
        owner: req.user.id
      }).exec(function (error, event) {
        if (error) {
          return res.serverError(error);
        } else {
          return res.created(event, {modelName: "event"});
        }
      });
    } else {
      return res.view("event/form", {data: {title: "Create event"}});
    }
  },

  /**
   * Update event or show update event form
   * @param {Object} req Request object
   * @param {Object} res Response object
     */
  update(req, res) {
    if (req.body) {
      Event.update({id: req.param("id")}, {
        name: req.body.name,
        startDate: req.body.start_date,
        endDate: req.body.end_date,
        owner: req.user.id
      }).exec(function (error, event) {
        if (error) {
          return res.serverError(error);
        } else {
          res.redirect(`/event/${event[0].id}`);
        }
      });
    } else {
      Event.getEventById(req.param("id")).then(function (event) {
        return res.view("event/form", {
          data: {
            title: "Update event",
            fields: event
          }
        });
      }, function (error) {
        res.serverError(error);
      });
    }
  },

  /**
   * Delete event
   * @param {Object} req Request object
   * @param {Object} res Response object
     */
  delete(req, res) {
    if (req.body || req.param("continue")) {
      Event.destroy({id: req.param("id")}).exec(function (error) {
        if (error) {
          return res.serverError(error);
        } else {
          return res.ok({
            message: {
              type: "success",
              name: `Successfully deleted event`,
              content: `Event was successfully deleted`,
              links: [
                {
                  url: `/user/${req.user.name}/events`,
                  name: `My events`
                }
              ]
            }
          }, {view: "message"});
        }
      });
    } else {
      Event.getEventById(req.param("id")).then(function (event) {
        return res.view("warning", {
          message: {
            type: "warning",
            name: `Deleting event -"${event.name}"`,
            content: `You going to delete event -"${event.name}"`
          }
        });
      }, function (error) {
        return res.serverError(error);
      });

    }
  },

  /**
   * Manages requests to team of event
   * @param {Object} req Request object
   * @param {Object} res Response object
   */
  team(req, res) {
    let eventId = req.param("id");

    Event.getEventTeam(eventId).then(function (team) {
      return res.ok(team, "event/team/index");
    }, function (error) {
      return res.serverError(error);
    });
  },

  /**
   * Adds user to event team
   * @param req
   * @param res
   */
  teamAddUser(req, res) {
    let eventId = req.param("id");
    if (req.body) {
      Event.addUserToTeam(eventId, req.body.userid).then(function (event) {
        return res.created(event, {modelName: "event team"});
      }, function (error) {
        if (error) {
          return res.serverError(error);
        }
      });
    } else {
      return res.view("event/team/add");
    }
  }
};

