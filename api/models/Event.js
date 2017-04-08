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

