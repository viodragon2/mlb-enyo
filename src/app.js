var
  Application = require('enyo/Application');

var
  MainView = require('./views/main');

var app = Application.kind({
  view: MainView
});

module.exports = app;