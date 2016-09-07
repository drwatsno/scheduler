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
      var startDate = new Date(req.body.start_date),
          endDate = new Date(req.body.end_date);

      startDate.setHours(Number(/(\d*)\:(\d*)/g.exec(req.body.start_time)[1])||0);
      startDate.setMinutes(Number(/(\d*)\:(\d*)/g.exec(req.body.start_time)[2])||0);

      endDate.setHours(Number(/(\d*)\:(\d*)/g.exec(req.body.start_time)[1])||0);
      endDate.setMinutes(Number(/(\d*)\:(\d*)/g.exec(req.body.start_time)[2])||0);

      Talk.create({
        name: req.body.name,
        startDate: startDate,
        endDate: endDate,
        track: req.param("trackid"),
        speakers: [req.body.speaker],
        owner: req.user.id
      }).exec(function (error, talk) {
        if (error) {
          return res.serverError(error);
        } else {
         /* talk.speakers.add(req.body.speaker);
          talk.save(function (error) {
            if (error) {
              res.serverError(error);
            } else {
              return res.created(talk, {modelName: 'talk'});
            }
          });*/
          return res.created(talk, {modelName: 'talk'});
        }
      })
    } else {
      return res.view('talk/form', {data: {title: 'Create talk'}})
    }
  },

  update: function (req, res) {
    if (req.body) {
      var startDate = new Date(req.body.start_date),
        endDate = new Date(req.body.end_date);

      startDate.setHours(Number(/(\d*)\:(\d*)/g.exec(req.body.start_time)[1])||0);
      startDate.setMinutes(Number(/(\d*)\:(\d*)/g.exec(req.body.start_time)[2])||0);

      endDate.setHours(Number(/(\d*)\:(\d*)/g.exec(req.body.start_time)[1])||0);
      endDate.setMinutes(Number(/(\d*)\:(\d*)/g.exec(req.body.start_time)[2])||0);

      Talk.update({id: req.param("id")}, {
        name: req.body.name,
        startDate: startDate,
        endDate: endDate,
        owner: req.user.id
      }).exec(function (error, talk) {
        if (error) {
          return res.serverError(error);
        } else {
          res.redirect(req.path+'../'+talk.id);
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

