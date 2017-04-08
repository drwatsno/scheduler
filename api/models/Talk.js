/**
 * Talk.js
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
      unique: false,
      required: true
    },
    description: {
      type: "text",
      unique: false
    },
    startDate: {
      type: "datetime",
      unique: false,
      required: true
    },
    endDate: {
      type: "datetime",
      unique: false,
      required: true
    },
    speakers: {
      collection: "user",
      via: "talks"
    },
    track: {
      model: "track"
    },
    owner: {
      model: "user"
    },
    isOwnedByCurrentUser(req) {
      return !req.user ? false : this.owner.id === req.user.id;
    }
  }
};

