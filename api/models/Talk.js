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
      required: true,
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
      type: 'track',
      unique: false
    }
  }
};

