module.exports = function(req, res, next) {
  var talkId = req.param("id");
  Talk.findOne({id: talkId})
    .exec(function (error, talk) {
      if (error) {
        return res.serverError(error)
      } else {
        if (talk) {
          if (talk.owner == req.user.id) {
            return next();
          } else {
            return res.forbidden('You trying do something with talk which not belongs to you!')
          }
        } else {
          return res.notFound('No such talk');
        }

      }
    })
};
