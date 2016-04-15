var
  Control = require('enyo/Control');

var
  ScoreBoardColumn = require('./scoreboardcolumn');

var table = Control.kind({
  classes: 'table',
  components: [
    {name: 'team', classes: 'team', kind: ScoreBoardColumn, header: 'Final'},
    {name: 'innings_1', header: '1', kind: ScoreBoardColumn},
    {name: 'innings_2', header: '2', kind: ScoreBoardColumn},
    {name: 'innings_3', header: '3', kind: ScoreBoardColumn},
    {name: 'innings_4', header: '4', kind: ScoreBoardColumn},
    {name: 'innings_5', header: '5', kind: ScoreBoardColumn},
    {name: 'innings_6', header: '6', kind: ScoreBoardColumn},
    {name: 'innings_7', header: '7', kind: ScoreBoardColumn},
    {name: 'innings_8', header: '8', kind: ScoreBoardColumn},
    {name: 'innings_9', header: '9', kind: ScoreBoardColumn},
    {name: 'run', classes: 'run', kind: ScoreBoardColumn, header: 'R'},
    {name: 'hit', kind: ScoreBoardColumn, header: 'H'},
    {name: 'error', kind: ScoreBoardColumn, header: 'E'}
  ],
  setHomeName: function(homeName) {
    this.$.team.set('home', homeName);
  },
  setAwayName: function(awayName) {
    this.$.team.set('away', awayName);
  },
  setTable: function(linescore, status) {
    var inning = linescore.inning,
        i;

    // for extra innings add columns
    for (i = 9; i < inning.length && !this.$['innings_' + (i + 1)]; i++) {
      this.createComponent({
        name: 'innings_' + (i + 1),
        kind: ScoreBoardColumn,
        header: i + 1,
        addBefore: this.$.run
      });
    }

    // set score
    for(i = 0; i < inning.length; i++) {
      if (status == 'Final') {
        this.$['innings_' + (i+1)].set('home', i == 8 && !inning[i].home ? 'X' : inning[i].home);
        this.$['innings_' + (i+1)].set('away', inning[i].away);
      } else {
        this.$['innings_' + (i+1)].set('away', 0);
        this.$['innings_' + (i+1)].set('home', 0);
      }
    }

    // remove any extra innings if there are from previous table
    for (i = 9; inning.length <= i && this.$['innings_' + (i + 1)]; i++) {
      this.$['innings_' + (i + 1)].destroy();
    }

    this.$.run.set('away', linescore.r.away);
    this.$.run.set('home', linescore.r.home);
    this.$.hit.set('away', linescore.h.away);
    this.$.hit.set('home', linescore.h.home);
    this.$.error.set('away', linescore.e.away);
    this.$.error.set('home', linescore.e.home);
    this.render();
  }
});

module.exports = table;