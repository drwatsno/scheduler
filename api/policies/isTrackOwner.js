module.exports = function(req, res, next) {
  var trackId = req.param("id");
  Track.findOne({id: trackId})
    .exec(function (error, track) {
      if (error) {
        return res.serverError(error)
      } else {
        if (track) {
          if (track.owner == req.user.id) {
            return next();
          } else {
            return res.forbidden('You trying do something with track which not belongs to you!')
          }
        } else {
          return res.notFound('No such track');
        }

      }
    })
};
