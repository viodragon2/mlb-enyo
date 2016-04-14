var
  Control = require('enyo/Control');

var
  ScoreBoardColumn = require('./scoreboardcolumn');

var table = Control.kind({
  classes: 'table',
  components: [
    {name: 'team', classes: 'team', kind: ScoreBoardColumn, header: 'Final'},
    // innings go here
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
  setTable: function(linescore) {
    var inning = linescore.inning,
        i;

    for(i = 0; i < inning.length; i++) {
      if (!this.$['innings_' + (i+1)]) {
        this.createComponent({
          name: 'innings_' + (i + 1),
          kind: ScoreBoardColumn,
          header: i + 1,
          home: inning[i].home || 'X',
          away: inning[i].away || 'X',
          addBefore: this.$.run
        });
      } else {
        this.$['innings_' + (i+1)].set('home', inning[i].home || 'X');
        this.$['innings_' + (i+1)].set('away', inning[i].away || 'X');
      }
    }

    // remove any extra innings if there are from previous table
    while (this.$['innings_' + (i + 1)]) {
      this.$['innings_' + (i + 1)].destroy();
      i++;
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