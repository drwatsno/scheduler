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
    }
  },

  /**
   * Create event and add user with given userId as part of its team
   * @param ownerId
   * @param eventData
     */
  createWithOwner: function (eventData, ownerId) {
    return new Promise(function (resolve, reject) {
      Event.create({
        name: eventData.name,
        startDate: eventData.start_date,
        endDate: eventData.end_date,
        owner: ownerId
      })
        .exec(function (error, event) {

          if (error) {
            reject(error);
          }

          if (event) {
            event.team.add([ownerId]);
            event.save(function (error) {
              if (error) {
                reject(error);
              }
              resolve(event);
            });
          }
      })
    })
  },

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
  
  getEventTeam: function (eventId) {
    return new Promise(function (resolve, reject) {
      Event.find({id: eventId})
        .populate('team')
        .exec(function (error, events) {
          if (error) {
            reject(error)
          } else {
            if (!events||events.length<1) {
              reject(new Error('No such event'))
            }
            resolve(events[0].team)
          }
        })
    })
  },

  addUserToTeam: function (eventId, userId) {
    return new Promise(function (resolve, reject) {
      Event.findOne({id: eventId})
        .exec(function (error, event) {
          if (error) {
            reject(error)
          } else {
            event.team.add(userId);
            event.save(function (error) {
              if (error) {
                reject(error)
              } else {
                resolve(event)
              }
            })
          }
        })
    })
  }
};

