/**
 * Talk.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

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
    description: {
      type: 'text',
      unique: false
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
    speakers: {
      collection: 'user',
      via: 'talks',
      required: true
    },
    track: {
      model: 'track'
    },
    owner: {
      model: 'user'
    },
    isOwnedByCurrentUser: function(req) {
      if (!req.user) return false;
      return this.owner.id == req.user.id;
    }
  },
  /**
   * returns talk by its id
   * @param talkId
   * @returns {Promise}
   */
  getTalkById: function (talkId) {
    return new Promise(function (resolve, reject) {
      Talk.find({id: talkId})
        .populate('owner')
        .exec(function (error, talks) {
          if (error) {
            reject(error)
          } else {
            if (!talks||talks.length<1) {
              reject(new Error('No such talk'))
            }
            resolve(talks[0])
          }
        });
    });
  }
};

