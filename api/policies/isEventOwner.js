module.exports = function(req, res, next) {
  var eventId = req.param("id");
  sails.log('checking policy - isEventOwner...');
  Event.findOne({id: eventId})
    .exec(function (error, event) {
      sails.log('...for user - '+req.user.name+' and event '+event.name);
      if (error) {
        return res.serverError(error)
      } else {
        if (event) {
          sails.log('...GRANTED');
          if (event.owner == req.user.id) {
            return next();
          } else {
            sails.log('...DENIED!');
            return res.forbidden('You trying do something with event which not belongs to you!')
          }
        } else {
          return res.notFound('No such event');
        }

      }
    })
};
