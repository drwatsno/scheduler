/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
"use strict";
let bCrypt = require("bcrypt");
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
      unique: true,
      defaultsTo: function () {
        return this.email.match(/.*(?=\@)/g)[0];
      }
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

  beforeCreate(values, callback) {
    bCrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        callback(saltError);
      }
      bCrypt.hash(values.password, salt, function (hashError, hash) {
        if (hashError) {
          callback(hashError);
        } else {
          values.password = hash;
          callback();
        }
      });
    });
  }
};

