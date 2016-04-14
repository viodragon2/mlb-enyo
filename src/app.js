var
  Application = require('enyo/Application');

var
  MainView = require('./views/main');

var app = Application.kind({
  view: MainView,
  create: function() {
    Application.prototype.create.apply(this, arguments);

    var date,
        launchParams;

    if (window.PalmSystem && window.PalmSystem.launchParams) {
      launchParams = JSON.parse(window.PalmSystem.launchParams);
      date = launchParams.date;
      //TODO: to be formatted
    }

    this.view.setDate(date);
  }
});

module.exports = app;