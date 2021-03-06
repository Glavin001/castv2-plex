const util = require('util');
const castv2Cli = require('castv2-client');
const Application = castv2Cli.Application;
const MediaController = castv2Cli.MediaController;
const PlexController = require('./PlexController');

function Plex(client, session) {
  Application.apply(this, arguments);
  this.media = this.createController(MediaController);
  this.plex = this.createController(PlexController);
  this.media.on('status', onstatus);
  const self = this;
  function onstatus(status) {
    self.emit('status', status);
  }
}

Plex.APP_ID = '9AC194DC';

util.inherits(Plex, Application);

Plex.prototype.setNamespace = function (namespace) {
  this.plex.setNamespace(namespace);
}

Plex.prototype.getStatus = function (callback) {
  this.setNamespace("urn:x-cast:com.google.cast.media");
  this.media.getStatus.apply(this.media, arguments);
};

Plex.prototype.send = function () {
  this.plex.send.apply(this.plex, arguments);
};

Plex.prototype.play = function (callback) {
  this.setNamespace("urn:x-cast:plex");
  this.media.play.apply(this.media, arguments);
};

Plex.prototype.pause = function (callback) {
  this.setNamespace("urn:x-cast:plex");
  this.media.pause.apply(this.media, arguments);
};

Plex.prototype.stop = function (callback) {
  this.setNamespace("urn:x-cast:plex");
  this.media.stop.apply(this.media, arguments);
};

Plex.prototype.seek = function (currentTime, callback) {
  this.setNamespace("urn:x-cast:plex");
  this.media.seek.apply(this.media, arguments);
};

Plex.prototype.load = function (videoId, callback) {
  this.setNamespace("urn:x-cast:com.google.cast.media");
  return this.plex.load.apply(this.plex, arguments);
};

Plex.prototype.login = function () {
  return this.plex.login.apply(this.plex, arguments);
};

Plex.prototype.servers = function () {
  return this.plex.servers.apply(this.plex, arguments);
};

Plex.prototype.selectServer = function () {
  return this.plex.selectServer.apply(this.plex, arguments);
};

Plex.prototype.showDetails = function () {
  this.setNamespace("urn:x-cast:plex");
  return this.plex.showDetails.apply(this.plex, arguments);
};

module.exports = Plex;
