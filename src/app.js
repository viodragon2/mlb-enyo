var
  Application = require('enyo/Application');

var
  MainView = require('./views/main');

var app = Application.kind({
  view: MainView,
  create: function() {
    Application.prototype.create.apply(this, arguments);

    var template = 'mlb',
        data = {},
        launchParams;

    if (window.PalmSystem && window.PalmSystem.launchParams) {
      launchParams = JSON.parse(window.PalmSystem.launchParams);
      template = launchParams.template;
      data = launchParams.data;
    }

    this.view.setTemplate(template, data);
  }
});

module.exports = app;