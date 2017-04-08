module.exports.policies = {

  '*': true,

  'UserController': {
    profile: 'isAuthenticated',
    events: 'isAuthenticated',
    delete: false,
    update: false
  },

  'EventController': {
    index: true,
    view: true,
    delete: ['isAuthenticated','isEventOwner'],
    create: 'isAuthenticated',
    update: ['isAuthenticated','isEventOwner']
  },

  'TrackController': {
    index: true,
    view: true,
    delete: ['isAuthenticated','isTrackOwner'],
    create: 'isAuthenticated',
    update: ['isAuthenticated','isTrackOwner']
  },

  'TalkController': {
    index: true,
    view: true,
    delete: ['isAuthenticated','isTalkOwner'],
    create: 'isAuthenticated',
    update: ['isAuthenticated','isTalkOwner']
  }
};
