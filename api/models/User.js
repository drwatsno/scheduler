/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

let uuid = require("uuid");

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
    password: {
      type: "string",
      minLength: 6,
      required: true
    },
    role: {
      type: "role",
      unique: false
    },
    email: {
      type: "email",
      required: true,
      unique: true,
      email: true
    },
    events: {
      collection: "event",
      via: "team",
      dominant: true
    },
    talks: {
      collection: "talk",
      via: "speakers",
      dominant: true
    },
    toJSON() {
      const obj = this.toObject();

      delete obj.password;
      return obj;
    }
  },
  /**
   * @private
   * @param values
   * @param next
   */
  beforeUpdate: function (values, next) {
    CipherService.hashPassword(values);
    next();
  },

  /**
   * @private
   * @param values
   * @param next
   */
  beforeCreate: function (values, next) {
    values.name = values.email.match(/.*(?=\@)/g)[0];
    CipherService.hashPassword(values);
    next();
  }
};

