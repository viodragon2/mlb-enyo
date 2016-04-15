var
  Application = require('enyo/Application');

var
  MainView = require('./views/main');

var app = Application.kind({
  view: MainView,
  create: function() {
    Application.prototype.create.apply(this, arguments);

    // var template = 'movie',
    var template = 'mlb',
    // var template = 'weather',
        data = {},
        id = '1460695267375',
        launchParams;

    if (window.PalmSystem && window.PalmSystem.launchParams) {
      launchParams = JSON.parse(window.PalmSystem.launchParams);
      template = launchParams.template;
      data = launchParams.data;
      id = launchParams.id;
    }

    this.view.setTemplate(template, data);
  },
  success: function(sender, res) {
    console.log("success");
    console.log(res);
  },
  err: function(sender, res) {
    console.log("err");
    console.log(res);

  }
});

module.exports = app;

// http://97371f5f.ngrok.io/addData?data=%7B%22title%22%3A%22The%20Sandlot%22%2C%22year%22%3A%221993%22%2C%22runtime%22%3A%22101%20min%22%2C%22director%22%3A%22David%20M.%20Evans%22%2C%22actors%22%3A%22Tom%20Guiry%2C%20Mike%20Vitar%2C%20Patrick%20Renna%2C%20Chauncey%20Leopardi%22%2C%22plot%22%3A%22A%20new%20kid%20in%20town%20is%20taken%20under%20the%20wing%20of%20a%20young%20baseball%20prodigy%20and%20his%20team%20in%20this%20coming%20of%20age%20movie%20set%20in%20the%20summer%20of%201962.%20Together%2C%20they%20get%20themselves%20into%20many%20adventures%20involving%20rival%20teams%2C%20lifeguards%2C%20and%20a%20vicious%20dog.%22%2C%22rating%22%3A%227.8%22%2C%22posterUrl%22%3A%22http%3A%2F%2Fia.media-imdb.com%2Fimages%2FM%2FMV5BMTgyODA5MzQ1MF5BMl5BanBnXkFtZTgwMzYxNzYxMTE%40._V1_SX300.jpg%22%2C%22id%22%3A%22tt0108037%22%2C%22trailerUrl%22%3A%22v.traileraddict.com%2F67738%22%7D