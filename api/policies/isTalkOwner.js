module.exports = function (req, res, next) {
  let talkId = req.param("id");
  Talk.findOne({id: talkId})
    .exec(function (error, talk) {
      if (error) {
        return res.serverError(error);
      }
      if (talk) {
        return talk.owner === req.user.id ? next() : res.forbidden("You trying do something with talk which not belongs to you!");
      } else {
        return res.notFound("No such talk");
      }
    });
};
