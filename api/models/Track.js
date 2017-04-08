/**
 * Track.js
 *
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
const uuid = require("uuid");

module.exports = {

  attributes: {
    id: {
      type: "text",
      primaryKey: true,
      unique: true,
      required: true,
      uuidv4: true,
      defaultsTo: () => uuid.v4()
    },
    name: {
      type: "string",
      unique: false
    },
    startDate: {
      type: "datetime",
      unique: false
    },
    endDate: {
      type: "datetime",
      unique: false
    },
    talks: {
      collection: "talk",
      via: "track"
    },
    event: {
      model: "event"
    },
    owner: {
      model: "user",
      required: true
    },
    isOwnedByCurrentUser(req) {
      return !req.user ? false : this.owner.id === req.user.id;
    }
  }
};

