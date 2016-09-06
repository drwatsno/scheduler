module.exports = function(req, res, next) {
  var eventId = req.param("id");
  Event.findOne({id: eventId})
    .exec(function (error, event) {
      if (error) {
        return res.serverError(error)
      } else {
        if (event) {
          if (event.owner == req.user.id) {
            return next();
          } else {
            return res.forbidden('You trying do something with event which not belongs to you!')
          }
        } else {
          return res.notFound('No such event');
        }

      }
    })
};
