var
  Control = require('enyo/Control');

var
  scoremain = require('./scoremain'),
  table = require('./table'),
  pitchers = require('./pitchers');

var scoreboard = Control.kind({
  classes: 'scoreboard',
  components: [
    {name: 'score', kind: scoremain},
    {name: 'table', kind: table},
    {name: 'pitchers', kind: pitchers}
  ],
  scoreChanged: function() {
    this.$.score.set('data', {
      home: {
        name: this.score.home,
        run: this.score.linescore.r.home
      },
      away: {
        name: this.score.away,
        run: this.score.linescore.r.away
      }
    });

    this.$.table.setHomeName(this.score.home);
    this.$.table.setAwayName(this.score.away);
    this.$.table.setTable(this.score.linescore);

    this.$.pitchers.setPitchers(
      this.score.winning_pitcher,
      this.score.losing_pitcher,
      this.score.save_pitcher
    );
  }
});

module.exports = scoreboard;