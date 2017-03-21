module.exports = function (req, res, next) {
  const trackId = req.param("id");
  
  Track.findOne({id: trackId})
    .exec(function (error, track) {
      if (error) {
        return res.serverError(error);
      }
      if (track) {
        return track.owner === req.user.id ? next() : res.forbidden("You trying do something with track which not belongs to you!");
      } else {
        return res.notFound("No such track");
      }
    });
};
