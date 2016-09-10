/**
 * Event.js
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
    owner: {
      model: "user",
      required: true
    },
    team: {
      collection: "user",
      via: "events"
    },
    tracks: {
      collection: "track",
      via: "event",
      required: false
    },
    isOwnedByCurrentUser(req) {
      return !req.user ? false : this.owner.id === req.user.id;
    },
    getTracks() {
      let thisEvent = this;
      return new Promise(function (resolve, reject) {
        Track.find({event: thisEvent.id}).exec(function (error, tracks) {
          if (error) {
            reject(error);
          } else {
            if (!tracks) {
              reject("No tracks in this event");
            }
            resolve(tracks);
          }
        });
      });
    }
  },

  /**
   * returns all events
   * @returns {Promise}
     */
  getAllEvents() {
    return new Promise(function (resolve, reject) {
      Event.find()
        .populate("team")
        .populate("owner")
        .exec(function (error, events) {
          if (error) {
            reject(error);
          } else {
            if (!events || events.length < 1) {
              reject(new Error("No events"));
            }
            resolve(events);
          }
        });
    });
  },

  /**
   * returns event by its id
   * @param eventId
   * @returns {Promise}
     */
  getEventById(eventId) {
    return new Promise(function (resolve, reject) {
      Event.find({id: eventId})
        .populateAll()
        .exec(function (error, events) {
          if (error) {
            reject(error);
          } else {
            if (!events || events.length < 1) {
              reject(new Error("No such event"));
            }
            resolve(events[0]);
          }
        });
    });
  },

  /**
   * returns team list objects
   * @param eventId
   * @returns {Promise}
     */
  getEventTeam(eventId) {
    return new Promise(function (resolve, reject) {
      Event.find({id: eventId})
        .populate("team")
        .exec(function (error, events) {
          if (error) {
            reject(error);
          } else {
            if (typeof events === "undefined" || events.length < 1 || typeof events[0].team === "undefined") {
              reject(new Error("No such event"));
            } else {
              resolve(events[0].team);
            }
          }
        });
    });
  },

  /**
   * Adds user to event team
   * @param eventId
   * @param userId
   * @returns {Promise}
     */
  addUserToTeam(eventId, userId) {
    return new Promise(function (resolve, reject) {
      Event.findOne({id: eventId})
        .exec(function (error, event) {
          if (error) {
            reject(error);
          } else {
            if (event) {
              event.team.add(userId);
              event.save(function (eventSaveError) {
                if (eventSaveError) {
                  reject(eventSaveError);
                } else {
                  resolve(event);
                }
              });
            } else {
              reject("no such event");
            }
          }
        });
    });
  },

  /**
   * All events has one team member (owner) after create
   * @param eventModel
   * @param callback
     */
  afterCreate(eventModel, callback) {
    Event.findOne({id: eventModel.id}).exec(function (error, event) {
      if (error) {
        callback(error);
      }
      event.team.add(event.owner);
      event.save(function (eventSaveError) {
        callback(eventSaveError || void 0);
      });
    });
  }
};

