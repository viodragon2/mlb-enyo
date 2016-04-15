var
  Application = require('enyo/Application'),
  Signals = require('enyo/Signals');

var
  MainView = require('./views/main');

var
  server = require('./data/server');

var app = Application.kind({
  view: MainView,
  request_id: '',
  // request_id: '1460710806060',
  template: '',
  // template: 'movie',
  // template: 'mlb',
  // template: 'weather',
  data: {},
  components: [
    {
      kind: Signals,
      onwebOSRelaunch: 'handleRelaunch'
    }
  ],
  create: function() {
    Application.prototype.create.apply(this, arguments);

    this.setPath(window.PalmSystem && window.PalmSystem.launchParams);
  },
  setPath: function(param)  {
    var s = new server();
    if (param) {
      this.template = param.template;
      this.data = param.data;
      this.request_id = param.id;
    }

    s.getDataById(this.request_id, this.success.bind(this), this.err.bind(this));
  },
  handleRelaunch: function(sender, ev) {
    this.setPath(ev.detail);
  },
  success: function(sender, res) {
    if (res.data) {
      this.data = JSON.parse(res.data);
    }

    this.view.setTemplate(this.template, this.data);
  },
  err: function(sender, res) {
    console.err('failed to recieve data from server: ' + res);
    this.view.setTemplate(this.template, this.data);
  }
});

module.exports = app;

// http://97371f5f.ngrok.io/addData?data=%7B%22title%22%3A%22The%20Sandlot%22%2C%22year%22%3A%221993%22%2C%22runtime%22%3A%22101%20min%22%2C%22director%22%3A%22David%20M.%20Evans%22%2C%22actors%22%3A%22Tom%20Guiry%2C%20Mike%20Vitar%2C%20Patrick%20Renna%2C%20Chauncey%20Leopardi%22%2C%22plot%22%3A%22A%20new%20kid%20in%20town%20is%20taken%20under%20the%20wing%20of%20a%20young%20baseball%20prodigy%20and%20his%20team%20in%20this%20coming%20of%20age%20movie%20set%20in%20the%20summer%20of%201962.%20Together%2C%20they%20get%20themselves%20into%20many%20adventures%20involving%20rival%20teams%2C%20lifeguards%2C%20and%20a%20vicious%20dog.%22%2C%22rating%22%3A%227.8%22%2C%22posterUrl%22%3A%22http%3A%2F%2Fia.media-imdb.com%2Fimages%2FM%2FMV5BMTgyODA5MzQ1MF5BMl5BanBnXkFtZTgwMzYxNzYxMTE%40._V1_SX300.jpg%22%2C%22id%22%3A%22tt0108037%22%2C%22trailerUrl%22%3A%22v.traileraddict.com%2F67738%22%7D