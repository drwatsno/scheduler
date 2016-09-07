/**
 * Track.js
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
      unique: false
    },
    startDate: {
      type: 'datetime',
      unique: false
    },
    endDate: {
      type: 'datetime',
      unique: false
    },
    talks: {
      collection: 'talk',
      via: 'track'
    },
    event: {
      model: 'event'
    },
    owner: {
      model: 'user',
      required: true
    },
    isOwnedByCurrentUser: function(req) {
      if (!req.user) return false;
      return this.owner.id == req.user.id;
    }
  },
  /**
   * returns track by its id
   * @param trackId
   * @returns {Promise}
   */
  getTrackById: function (trackId) {
    return new Promise(function (resolve, reject) {
      Track.find({id: trackId})
        .populateAll()
        .exec(function (error, tracks) {
          if (error) {
            reject(error)
          } else {
            if (!tracks||tracks.length<1) {
              reject(new Error('No such track'))
            }
            resolve(tracks[0])
          }
        });
    });
  }
};

