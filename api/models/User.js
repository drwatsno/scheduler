/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var bcrypt = require("bcrypt");
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
      unique: true,
      defaultsTo: function () {
        return this.email.match(/.*(?=\@)/g)[0];
      }
    },
    password: {
      type: 'string',
      minLength: 6,
      required: true
    },
    role: {
      type: 'role',
      unique: false
    },
    email: {
      type: 'email',
      required: true,
      unique: true,
      email: true
    },
    events: {
      collection: 'event',
      via: 'team',
      dominant: true
    },
    talks: {
      collection: 'talk',
      via: 'speakers',
      dominant: true
    },
    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },

  beforeCreate: function(values, callback) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(values.password, salt, function(err, hash) {
        if (err) {
          console.log(err);
          callback(err);
        } else {
          values.password = hash;
          callback();
        }
      });
    });
  }
};

