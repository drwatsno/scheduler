/**
 * TalkController
 *
 * @description :: Server-side logic for managing talks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  /**
   * Single talk
   * @param req
   * @param res
   */
  view: function (req, res) {
    var talkId = req.param("id") || null;

    Talk.getTalkById(talkId).then(function (talk) {
      return res.ok(talk, 'talk/view');
    }, function (error) {
      return res.serverError(error);
    })
  },

  /**
   * creates talk
   * @param req
   * @param res
   */
  create: function (req, res) {
    if (req.body) {
      Talk.create({
        name: req.body.name,
        startDate: req.body.start_date,
        endDate: req.body.end_date,
        event: req.param("eventid"),
        owner: req.user.id
      }).exec(function (error, talk) {
        if (error) {
          return res.serverError(error);
        } else {
          return res.created(talk, {modelName: 'talk'});
        }
      })
    } else {
      return res.view('talk/form', {data: {title: 'Create talk'}})
    }
  },

  update: function (req, res) {
    if (req.body) {
      Talk.update({id: req.param("id")}, {
        name: req.body.name,
        startDate: req.body.start_date,
        endDate: req.body.end_date,
        owner: req.user.id
      }).exec(function (error, talk) {
        if (error) {
          return res.serverError(error);
        } else {
          res.redirect('/talk/' + talk[0].id);
        }
      })
    } else {
      Talk.getTalkById(req.param("id")).then(function (talk) {
        return res.view('talk/form', {
          data: {
            title: 'Update talk',
            fields: talk
          }
        })
      }, function (error) {
        res.serverError(error)
      });
    }
  },

  delete: function (req, res) {
    if (req.body || req.param("continue")) {
      Talk.destroy({id: req.param("id")}).exec(function (error) {
        if (error) {
          res.serverError(error)
        } else {
          res.ok({
            message: {
              type: 'success',
              name: `Successfully deleted talk`,
              content: `Talk was successfully deleted`,
              links: [
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
          }, {view: 'message'})
        }
      })
    } else {
      Talk.getTalkById(req.param("id")).then(function (talk) {
        return res.view('warning', {
          message: {
            type: 'warning',
            name: `Deleting talk -"${talk.name}"`,
            content: `You going to delete talk -"${talk.name}"`
          }
        })
      }, function (error) {
        res.serverError(error)
      });

    }
  }
};

