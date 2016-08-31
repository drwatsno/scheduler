/**
 * EventController
 *
 * @description :: Server-side logic for managing events
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

permissions = require("../services/permissionHelpers");
fields = require("../services/fieldsHelpers");

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
  create: function (req, res) {
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
          return res.created(event,{modelName: 'event'});
        }
      })
    } else {
      return res.view('event/form',{data:{title:'Create event'}})
    }
  },

  update: function (req, res) {
    if (req.body) {
      Event.update({id: req.param("id")},{
        name: req.body.name,
        startDate: req.body.start_date,
        endDate: req.body.end_date,
        owner: req.user.id
      }).exec(function (error, event) {
        if (error) {
          return res.serverError(error);
        } else {
          res.redirect('/event/'+event[0].id);
        }
      })
    } else {
      Event.getEventById(req.param("id")).then(function (event) {
        return res.view('event/form', {
          data: {
            title: 'Update event',
            fields: event
          }
        })
      },function (error) {
        res.serverError(error)
      });
    }
  },

  delete: function (req, res) {
    if (req.body||req.param("continue")) {
      Event.destroy({id: req.param("id")}).exec(function (error) {
        if (error) {
          res.serverError(error)
        } else {
         res.ok({
           message: {
             type: 'success',
             name: `Successfully deleted event`,
             content: `Event was successfully deleted`,
             links: [
               {
                 url: `/user/${req.user.name}/events`,
                 name: `My events`
               },
               {
                 url: `/`,
                 name: `Return to main`
               },
               {
                 url: `/user`,
                 name: `My profile`
               }
             ]
           }
         },{view:'message'})
        }
      })
    } else {
      Event.getEventById(req.param("id")).then(function (event) {
        return res.view('warning',{
          message: {
            type: 'warning',
            name: `Deleting event -"${event.name}"`,
            content: `You going to delete event -"${event.name}"`
          }
        })
      },function (error) {
        res.serverError(error)
      });

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
          return res.serverError(error);
        }
      })
    } else {
      return res.view('event/team/add')
    }
  }
};

