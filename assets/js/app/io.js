let socketIOClient = require('socket.io-client');
let sailsIOClient = require('sails.io.js');
const io = sailsIOClient(socketIOClient);
io.sails.url = 'http://localhost:1337';

module.exports = io;
