var
  Control = require('enyo/Control');

var
  mlb = require('./mlb'),
  movie = require('./movie'),
  weather = require('./weather');

var main = Control.kind({
  classes: 'moon main enyo-fit',
  setTemplate: function(template, data) {
    this.destroyComponents();

    switch(template) {
      case 'mlb':
        this.createComponent({
          template: template,
          kind: mlb,
          data: data
        }).render();
        break;
      case 'movie':
        this.createComponent({
          template: template,
          kind: movie,
          data: data
        }).render();
        break;
      case 'weather':
        data = data.query.results.channel;
        this.createComponent({
          template: template,
          kind: weather,
          data: data
        }).render();
        break;
      default:
        break;
    }
  }
});

module.exports = main;