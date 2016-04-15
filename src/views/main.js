var
  Control = require('enyo/Control');

var
  mlb = require('./mlb');

var main = Control.kind({
  classes: 'moon main enyo-fit',
  setTemplate: function(template, data) {
    switch(template) {
      case 'mlb':
        this.createComponent({
          template: template,
          kind: mlb,
          data: data
        }).render();
        break;
      default:
        break;
    }
  }
});

module.exports = main;