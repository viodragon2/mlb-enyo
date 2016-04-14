var
  Control = require('enyo/Control'),
  Ajax = require('enyo/Ajax');

var internals = {};

internals.mlb = {
  "host": "gd2.mlb.com",
  "protocol": "http",
  "port": 80,
  "basepath": "/components/game/mlb",
  "files": {
    "boxscore": "boxscore.json",
    "game_events": "game_events.json",
    "linescore": "linescore.json",
    "plays": "plays.json",
    "scoreboard": "master_scoreboard.json"
  }
};

internals.baseUrl = internals.mlb.protocol + '://' + internals.mlb.host + internals.mlb.basepath + '/';

var mlb = Control.kind({

  getScoreboard: function(options, success, err) {
    options = options || {};
    options.which = 'scoreboard';

    this.fetch(options, success, err);
  },

  fetch: function(options, success, err) {
    var url = internals.baseUrl + options.path + internals.mlb.files[options.which];
    var ajax = new Ajax({
      url: url,
      timeout: 10000,
      json: true
    });
    ajax.go();
    ajax.response(this, success);
    ajax.error(this, err);
  }
});

module.exports = mlb;