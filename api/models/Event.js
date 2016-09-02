/**
 * Event.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var uuid = require('uuid');

module.exports = {

  attributes: {
    id : {
      type: 'text',
      primaryKey: true,
      unique: true,
      required: true,
      uuidv4: true,
      defaultsTo: function () {
        return uuid.v4();
      }
    },
    name: {
      type: 'string',
      unique: false,
      required: true
    },
    startDate: {
      type: 'datetime',
      unique: false,
      required: true
    },
    endDate: {
      type: 'datetime',
      unique: false,
      required: true
    },
    owner: {
      model: 'user',
      required: true
    },
    team: {
      collection: 'user',
      via: 'events'
    },
    isOwnedByCurrentUser(req) {
      if (!req.user) return false;
      return this.owner.id == req.user.id;
    }
  },

  /**
   * returns all events
   * @returns {Promise}
     */
  getAllEvents: function () {
    return new Promise(function (resolve, reject) {
      Event.find()
        .populate('team')
        .populate('owner')
        .exec(function (error, events) {
          if (error) {
            reject(error)
          } else {
            if (!events||events.length<1) {
              reject(new Error('No events'))
            }
            resolve(events)
          }
        });
    });
  },

  /**
   * returns event by its id
   * @param eventId
   * @returns {Promise}
     */
  getEventById: function (eventId) {
    return new Promise(function (resolve, reject) {
      Event.find({id: eventId})
        .populate('team')
        .populate('owner')
        .exec(function (error, events) {
          if (error) {
            reject(error)
          } else {
            if (!events||events.length<1) {
              reject(new Error('No such event'))
            }
            resolve(events[0])
          }
        });
    });
  },

  /**
   * returns team list objects
   * @param eventId
   * @returns {Promise}
     */
  getEventTeam: function (eventId) {
    return new Promise(function (resolve, reject) {
      Event.find({id: eventId})
        .populate('team')
        .exec(function (error, events) {
          if (error) {
            reject(error)
          } else {
            if (typeof events=='undefined'||events.length<1||typeof events[0].team =='undefined') {
              reject(new Error('No such event'))
            } else {
              resolve(events[0].team)
            }
          }
        })
    })
  },

  /**
   * Adds user to event team
   * @param eventId
   * @param userId
   * @returns {Promise}
     */
  addUserToTeam: function (eventId, userId) {
    return new Promise(function (resolve, reject) {
      Event.findOne({id: eventId})
        .exec(function (error, event) {
          if (error) {
            reject(error)
          } else {
            if (event) {
              event.team.add(userId);
              event.save(function (error) {
                if (error) {
                  reject(error)
                } else {
                  resolve(event)
                }
              })
            } else {
             res.notFound('no such event')
            }
          }
        })
    })
  },

  /**
   * All events has one team member (owner) after create
   * @param event
   * @param callback
     */
  afterCreate: function (event, callback) {
    Event.findOne({id: event.id}).exec(function (error, event) {
      if (error) {
        callback(error);
      }
      event.team.add(event.owner);
      event.save(function (error) {
        if (error) {
          callback(error);
        } else {
          callback();
        }
      });
    });

  }
};

