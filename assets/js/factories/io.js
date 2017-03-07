const appScheduler = require("../app");

appScheduler.factory("io", function () {
  const socketIOClient = require('socket.io-client');
  const sailsIOClient = require('sails.io.js');
  const io = sailsIOClient(socketIOClient);

  io.sails.url = 'http://localhost:1337';

  return io;
});
