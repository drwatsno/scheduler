/**
 * Talk.js
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
  },
  /**
   * returns talk by its id
   * @param {Number} talkId Talk ID
   * @returns {Promise}
   */
  getTalkById(talkId) {
    return new Promise(function (resolve, reject) {
      Talk.find({id: talkId})
        .populateAll()
        .exec(function (error, talks) {
          if (error) {
            reject(error);
          } else {
            if (!talks || talks.length < 1) {
              reject(new Error("No such talk"));
            } else {
              Event.findOne({id: talks[0].track.event}).exec(function (queryError, event) {
                if (queryError) {
                  reject(queryError);
                } else {
                  talks[0].event = Object.create(event);
                  resolve(talks[0]);
                }
              });
            }
          }
        });
    });
  },
  /**
   * Get talk speakers
   * @param {Number} talkId Talk ID
   * @returns {Promise}
     */
  getSpeakers(talkId) {
    return new Promise(function (resolve, reject) {
      Talk.find({id: talkId})
        .populate("speakers")
        .exec(function (error, speakers) {
          if (error) {
            reject(error);
          } else {
            resolve(speakers);
          }
        });
    });
  },
  /**
   * Add speaker to talk
   * @param {Number} talkId Talk ID
   * @param {Number} speakerId Speaker ID
   * @returns {Promise}
     */
  addSpeaker(talkId, speakerId) {
    return new Promise(function (resolve, reject) {
      Talk.findOne({id: talkId})
        .exec(function (error, talk) {
          if (error) {
            reject(error);
          } else {
            if (talk) {
              talk.speakers.add(speakerId);
              talk.save(function (saveError) {
                if (saveError) {
                  // error
                  reject(saveError);
                } else {
                  resolve(talk);
                }
              });
            } else {
              reject("talk not found");
            }
          }
        });
    });
  }
};

