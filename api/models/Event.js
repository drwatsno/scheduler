/**
 * Event.js
 *
 * @description :: Event model.
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
      const thisEvent = this;

      return new Promise(function (resolve, reject) {
        Track.find({event: thisEvent.id})
          .exec(function (error, tracks) {
            if (error) {
              reject(error);
              return;
            }

            if (!tracks || tracks.length < 1) {
              resolve([]);
              return;
            }

            resolve(tracks);
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
            return;
          }

          if (!events || events.length < 1) {
            resolve([]);
            return;
          }

          resolve(events);
        });
    });
  },

  /**
   * returns event by its id
   * @param {Number} eventId Event ID
   * @returns {Promise}
     */
  getEventById(eventId) {
    return new Promise(function (resolve, reject) {
      Event.find({id: eventId})
        .populateAll()
        .exec(function (error, events) {
          if (error) {
            reject(error);
            return;
          }

          if (!events || events.length < 1) {
            resolve([]);
            return;
          }

          resolve(events[0]);
        });
    });
  },

  /**
   * returns team list objects
   * @param {Number} eventId Event ID
   * @returns {Promise}
     */
  getEventTeam(eventId) {
    return new Promise(function (resolve, reject) {
      Event.find({id: eventId})
        .populate("team")
        .exec(function (error, events) {
          if (error) {
            reject(error);
            return;
          }

          if (!events || events.length < 1 || !events[0].team) {
            resolve({});
            return;
          }

          resolve(events[0].team);
        });
    });
  },

  /**
   * Adds user to event team
   * @param {Number} eventId Event ID
   * @param {Number} userId
   * @returns {Promise}
     */
  addUserToTeam(eventId, userId) {
    return new Promise(function (resolve, reject) {
      Event.findOne({id: eventId})
        .then(function (event) {
          if (!event) {
            reject("no such event");
            return;
          }

          event.team.add(userId);
          event.save(function (eventSaveError) {
            if (eventSaveError) {
              reject(eventSaveError);
            } else {
              resolve(event);
            }
          });
        });
    });
  },

  /**
   * All events has one team member (owner) after create
   * @param {Object} eventModel
   * @param {Function} callback
     */
  afterCreate(eventModel, callback) {
    Event.findOne({id: eventModel.id})
      .then(event => {
        event.team.add(event.owner);
        event.save(eventSaveError => callback(eventSaveError));
      });
  }
};

