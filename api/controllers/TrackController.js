/**
 * TrackController
 *
 * @description :: Server-side logic for managing tracks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  /**
   * Single track
   * @param req
   * @param res
   */
  view: function (req, res) {
    var trackId = req.param("id") || null;

    Track.getTrackById(trackId).then(function (track) {
      return res.ok(track, 'track/view');
    }, function (error) {
      return res.serverError(error);
    })
  },

  /**
   * creates track
   * @param req
   * @param res
   */
  create: function (req, res) {
    if (req.body) {
      Track.create({
        name: req.body.name,
        startDate: req.body.start_date,
        endDate: req.body.end_date,
        event: req.param("eventid"),
        owner: req.user.id
      }).exec(function (error, track) {
        if (error) {
          return res.serverError(error);
        } else {
          return res.created(track, {modelName: 'track'});
        }
      })
    } else {
      return res.view('track/form', {data: {title: 'Create track'}})
    }
  },

  update: function (req, res) {
    if (req.body) {
      Track.update({id: req.param("id")}, {
        name: req.body.name,
        startDate: req.body.start_date,
        endDate: req.body.end_date,
        owner: req.user.id
      }).exec(function (error, track) {
        if (error) {
          return res.serverError(error);
        } else {
          res.redirect('/track/' + track[0].id);
        }
      })
    } else {
      Track.getTrackById(req.param("id")).then(function (track) {
        return res.view('track/form', {
          data: {
            title: 'Update track',
            fields: track
          }
        })
      }, function (error) {
        res.serverError(error)
      });
    }
  },

  delete: function (req, res) {
    if (req.body || req.param("continue")) {
      Track.destroy({id: req.param("id")}).exec(function (error) {
        if (error) {
          res.serverError(error)
        } else {
          res.ok({
            message: {
              type: 'success',
              name: `Successfully deleted track`,
              content: `Track was successfully deleted`,
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
      Track.getTrackById(req.param("id")).then(function (track) {
        return res.view('warning', {
          message: {
            type: 'warning',
            name: `Deleting track -"${track.name}"`,
            content: `You going to delete track -"${track.name}"`
          }
        })
      }, function (error) {
        res.serverError(error)
      });

    }
  }
};

