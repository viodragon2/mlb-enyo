var
  Control = require('enyo/Control');

var
  MLB = require('../data/mlb');

var main = Control.kind({
  create: function() {
    Control.prototype.create.apply(this, arguments);
    var option = {
      path: 'year_2016/month_04/day_13/'
    };
    var mlb = new MLB();
    mlb.getScoreboard(option, this.success.bind(this), this.err.bind(this));
  },
  success: function(sender, res) {
    console.log(res);
  },
  err: function(sender, res) {
    console.error(res);
  }
});

module.exports = main;