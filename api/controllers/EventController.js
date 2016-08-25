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
    if (!req.isAuthenticated()) {
      return res.redirect("/login");
    }
    User.find({id: req.user.id})
        .populate('events')
        .exec(function(error, user) {
          console.log(user);
          if (error) {
            res.serverError(error);
          }
          res.view('event/index', {
            events: user[0].events
          });
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

    Event.find({id: eventId})
      .populate('team')
      .populate('owner')
      .exec(function (error, events) {
        if (error) {
          return res.view('message',{
            message: {
              type: 'error',
              name: 'Error',
              content: error.details,
              links: [
                {
                  url: `/`,
                  name: `Return to main`
                }
              ]
            }
          })
        }
        if (!events||events.length<1) {
          return res.view('message',{
            message: {
              type: 'error',
              name: 'No such event',
              content: `No event found with id ${eventId}`,
              links: [
                {
                  url: `/`,
                  name: `Return to main`
                }
              ]
            }
          })
        }
        console.log(events);
        return res.view('event/view',{
          event: events[0]
        })
      });
  },

  /**
   * creates user
   * @param req
   * @param res
     */
  create: function (req, res) {
      Event.createForUser(req.body, req.user.id).then(
        function (event) {
          return res.view('message',{
            message: {
              type: 'success',
              name: `Successfully created event`,
              content: `Successfully created event ${event.name}`,
                links: [
                  {
                    url: `/event/${event.id}`,
                    name: `Show event`
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
          })
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

