var
  Control = require('enyo/Control');

var
  IconButton = require('moonstone/IconButton');

var
  Team = require('./components/team'),
  ScoreBoard = require('./components/scoreBoard');

var
  MLB = require('../data/mlb');

var main = Control.kind({
  classes: 'moon main',
  components: [
    {name: 'prev', kind: IconButton, icon: 'arrowsmallleft', ontap: 'prevTapped'},
    {name: 'next', kind: IconButton, icon: 'arrowsmallright', ontap: 'nextTapped'},

    {name: 'board', classes: 'inline', kind: Control, components: [
      {name: 'awayTeam', kind: Team},
      {name: 'scoreboard', kind: ScoreBoard},
      {name: 'homeTeam', kind: Team},
    ]}
  ],
  create: function() {
    Control.prototype.create.apply(this, arguments);
    this.index = -1;
    var option = {
      path: 'year_2016/month_04/day_13/'
    };
    var mlb = new MLB();
    mlb.getScoreboard(option, this.success.bind(this), this.err.bind(this));
  },
  success: function(sender, res) {
    this.dataArr = this.dataArr || [];

    var games = res.data.games.game,
        game,
        data = {},
        i;
    for (i = 0; i < games.length; i++) {
      game = games[i];
      data = {
        home: {
          abbrev: game.home_name_abbrev,
          name: game.home_team_name,
          win: game.home_win,
          loss: game.home_loss
        },
        away: {
          abbrev: game.away_name_abbrev,
          name: game.away_team_name,
          win: game.away_win,
          loss: game.away_loss
        },
        score: {
          home: game.home_team_name,
          away: game.away_team_name,
          linescore: game.linescore,
          winning_pitcher: game.winning_pitcher,
          losing_pitcher: game.losing_pitcher,
          save_pitcher: game.save_pitcher
        }
      };
      this.dataArr.push(data);
    }
    if (this.index == -1) {
      this.nextTapped();
    }
  },
  err: function(sender, res) {
    console.error(res);
  },
  prevTapped: function() {
    this.index--;

    if (this.index < 0) {
      this.index = this.dataArr.length - 1;
    }

    this.$.awayTeam.set('data', this.dataArr[this.index].away);
    this.$.homeTeam.set('data', this.dataArr[this.index].home);

    this.$.scoreboard.set('score', this.dataArr[this.index].score);
  },
  nextTapped: function() {
    this.index++;

    if (this.index > this.dataArr.length - 1) {
      this.index = 0;
    }

    this.$.awayTeam.set('data', this.dataArr[this.index].away);
    this.$.homeTeam.set('data', this.dataArr[this.index].home);

    this.$.scoreboard.set('score', this.dataArr[this.index].score);
  }
});

module.exports = main;