/**
 * Event.js
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
    team: {
      collection: 'user',
      via: 'events'
    }
  }
};

