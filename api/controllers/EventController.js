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
      .exec(function (error, events) {
        if (error) {
          res.serverError(error);
        }
        console.log(events);
        return res.view('event/view',{
          event: events[0]
        })
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
      if (req.body) {
        Event.create({
          name: req.body.name,
          startDate: req.body.start_date,
          endDate: req.body.end_date
        }).exec(function (error, event) {
          if (error) {
            res.serverError(error);
          }

          event.team.add([req.user.id]);
          event.save(function (error) {
            if (error) {
              res.serverError(error);
            }
          });

          return res.view('message',{
            message: {
              type: 'success',
              name: `Successfully created event`,
              content: `Successfully created event ${event.name}
                <div class="sch-b_content-link-blocks">
                  <a class="sch-e_content-link-block" href="/event/${event.id}">Show event</a>
                  <a class="sch-e_content-link-block" href="/user">Return to main</a>
                  <a class="sch-e_content-link-block" href="/user">My profile</a>
                </div>`
            }
          })
        })
      } else {
        res.view('event/create');
      }
    } else {
      res.redirect('/login');
    }
  }
};

