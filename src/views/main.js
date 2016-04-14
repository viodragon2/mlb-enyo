var
  Control = require('enyo/Control');

var
  mlb = require('./mlb');

var main = Control.kind({
  setTemplate: function(template, data) {
    switch(template) {
      case 'mlb':
        this.createComponent({
          kind: mlb,
          date: data.date
        }).render();
        break;
      default:
        break;
    }
  }
});

module.exports = main;