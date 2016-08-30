module.exports = {
  isEventOwner: function (req, ownerId) {
    return req.isAuthenticated()&&ownerId==req.user.id;
  }
};
