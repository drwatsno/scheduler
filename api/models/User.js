/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
"use strict";
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
      let obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },

  /**
   * Returns user by id
   * @param {Number} userId
   * @return {Promise}
   */
  getUserById(userId) {
    return new Promise(function (resolve, reject) {
      User.findOne({id: userId}).exec(function (error, user) {
        if (error) {
          reject(error);
        } else {
          resolve(user);
        }
      });
    });
  },

  /**
   * Returns events by user id
   * @param {Number} userId User ID
   * @return {Promise}
   */
  getEventsByUserId(userId) {
    return new Promise(function (resolve, reject) {
      User.find({id: userId})
        .populate("events")
        .exec(function (error, user) {
          if (error) {
            reject(error);
          } else {
            resolve(user[0].events);
          }
        });
    });
  },

  /**
   * Returns user events by user name
   * @param {String} userName User name
   * @return {Promise}
   */
  getEventsByUserName(userName) {
    return new Promise(function (resolve, reject) {
      User.find({name: userName})
        .populate("events")
        .exec(function (error, user) {
          if (error) {
            reject(error);
          } else {
            resolve(user[0].events);
          }
        });
    });
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

