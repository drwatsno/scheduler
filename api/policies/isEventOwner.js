"use strict";
module.exports = function (req, res, next) {
  let eventId = req.param("id");
  Event.findOne({id: eventId})
    .exec(function (error, event) {
      if (error) {
        return res.serverError(error);
      }
      if (event) {
        return event.owner === req.user.id ? next() : res.forbidden("You trying do something with event which not belongs to you!");
      } else {
        return res.notFound("No such event");
      }
    });
};
