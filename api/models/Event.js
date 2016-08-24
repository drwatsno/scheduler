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
    team: {
      collection: 'user',
      via: 'events'
    }
  },

  /**
   * Create event and and user with given userId as part of its team
   * @param userId
   * @param eventData
     */
  createForUser: function (eventData, userId) {
    return new Promise(function (resolve, reject) {
      Event.create({
        name: eventData.name,
        startDate: eventData.start_date,
        endDate: eventData.end_date
      })
        .exec(function (error, event) {

          if (error) {
            reject(error);
          }

          if (event) {
            event.team.add([userId]);
            event.save(function (error) {
              if (error) {
                reject(error);
              }
            });
            resolve(event);
          }


      })
    })
  }
};

