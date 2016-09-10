/**
 * TalkController
 *
 * @description :: Server-side logic for managing talks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

"use strict";
const TIME_FIELD_PATTERN = /(\d+):(\d+)/;
module.exports = {
  /**
   * Single talk
   * @param req
   * @param res
   */
  view(req, res) {
    let talkId = req.param("id") || null;

    Talk.getTalkById(talkId).then(function (talk) {
      return res.ok(talk, "talk/view");
    }, function (error) {
      return res.serverError(error);
    });
  },

  /**
   * creates talk
   * @param req
   * @param res
   */
  create(req, res) {
    if (req.body) {
      let startDate = new Date(req.body.start_date),
        endDate = new Date(req.body.end_date);

      startDate.setHours(Number(TIME_FIELD_PATTERN.exec(req.body.start_time)[1]) || 0);
      startDate.setMinutes(Number(TIME_FIELD_PATTERN.exec(req.body.start_time)[2]) || 0);

      endDate.setHours(Number(TIME_FIELD_PATTERN.exec(req.body.start_time)[1]) || 0);
      endDate.setMinutes(Number(TIME_FIELD_PATTERN.exec(req.body.start_time)[2]) || 0);

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
          return res.created(talk, {modelName: "talk"});
        }
      });
    } else {
      return res.view("talk/form", {data: {title: "Create talk"}});
    }
  },

  /**
   * Update talk or show update form
   * @param req
   * @param res
   */
  update(req, res) {
    if (req.body) {
      let startDate = new Date(req.body.start_date),
        endDate = new Date(req.body.end_date);

      startDate.setHours(Number(TIME_FIELD_PATTERN.exec(req.body.start_time)[1]) || 0);
      startDate.setMinutes(Number(TIME_FIELD_PATTERN.exec(req.body.start_time)[2]) || 0);

      endDate.setHours(Number(TIME_FIELD_PATTERN.exec(req.body.start_time)[1]) || 0);
      endDate.setMinutes(Number(TIME_FIELD_PATTERN.exec(req.body.start_time)[2]) || 0);

      Talk.update({id: req.param("id")}, {
        name: req.body.name,
        startDate: startDate,
        endDate: endDate,
        owner: req.user.id
      }).exec(function (error, talk) {
        if (error) {
          return res.serverError(error);
        } else {
          return res.redirect(`${req.path}../${talk.id}`);
        }
      });
    } else {
      Talk.getTalkById(req.param("id")).then(function (talk) {
        return res.view("talk/form", {
          data: {
            title: "Update talk",
            fields: talk
          }
        });
      }, (error) => res.serverError(error));
    }
  },

  /**
   * Delete talk, show delete form or successful delete message
   * @param req
   * @param res
   */
  delete(req, res) {
    if (req.body || req.param("continue")) {
      Talk.destroy({id: req.param("id")}).exec(function (error) {
        if (error) {
          return res.serverError(error);
        } else {
          return res.ok({
            message: {
              type: "success",
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
          }, {view: "message"});
        }
      });
    } else {
      Talk.getTalkById(req.param("id")).then(function (talk) {
        return res.view("warning", {
          message: {
            type: "warning",
            name: `Deleting talk -"${talk.name}"`,
            content: `You going to delete talk -"${talk.name}"`
          }
        });
      }, (error) => res.serverError(error));
    }
  }
};

