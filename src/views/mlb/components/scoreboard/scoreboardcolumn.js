var
  Control = require('enyo/Control');

var ScoreBoardColumn = Control.kind({
  classes: 'scoreboard-column',
  components: [
    {name: 'header', classes: 'header'},
    {name: 'away', classes: 'cell'},
    {name: 'home', classes: 'cell'}
  ],
  header: '',
  home: '',
  away: '',
  create: function () {
    Control.prototype.create.apply(this, arguments);
    this.headerChanged();
    this.homeChanged();
    this.awayChanged();
  },
  headerChanged: function() {
    this.$.header.set('content', this.header);
  },
  homeChanged: function() {
    this.$.home.set('content', this.home);
  },
  awayChanged: function() {
    this.$.away.set('content', this.away);
  }
});

module.exports = ScoreBoardColumn;