/**
 * TrackController
 *
 * @description :: Server-side logic for managing tracks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
"use strict";
module.exports = {
  /**
   * Single track
   * @param {Object} req Request object
   * @param {Object} res Response object
   */
  view(req, res) {
    let trackId = req.param("id") || null;

    Track.getTrackById(trackId).then(function (track) {
      return res.ok(track, "track/view");
    }, (error) => res.serverError(error));
  },

  /**
   * Creates track
   * @param {Object} req Request object
   * @param {Object} res Response object
   */
  create(req, res) {
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
          return res.created(track, {modelName: "track"});
        }
      });
    } else {
      return res.view("track/form", {data: {title: "Create track"}});
    }
  },

  /**
   * Update track or show update track form
   * @param {Object} req Request object
   * @param {Object} res Response object
   */
  update(req, res) {
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
          return res.redirect(`/track/${track[0].id}`);
        }
      });
    } else {
      Track.getTrackById(req.param("id")).then(function (track) {
        return res.view("track/form", {
          data: {
            title: "Update track",
            fields: track
          }
        });
      }, (error) => res.serverError(error));
    }
  },

  /**
   * Delete track, show delete form or successful delete message
   * @param {Object} req Request object
   * @param {Object} res Response object
   */
  delete(req, res) {
    if (req.body || req.param("continue")) {
      Track.destroy({id: req.param("id")}).exec(function (error) {
        if (error) {
          return res.serverError(error);
        } else {
          return res.ok({
            message: {
              type: "success",
              name: `Successfully deleted track`,
              content: `Track was successfully deleted`,
            }
          }, {view: "message"});
        }
      });
    } else {
      Track.getTrackById(req.param("id")).then(function (track) {
        return res.view("warning", {
          message: {
            type: "warning",
            name: `Deleting track -"${track.name}"`,
            content: `You going to delete track -"${track.name}"`
          }
        });
      }, (error) => res.serverError(error));

    }
  }
};

