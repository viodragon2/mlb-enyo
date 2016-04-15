var
  IconButton = require('moonstone/IconButton'),
  DatePicker = require('moonstone/DatePicker');

var
  Team = require('./components/team'),
  ScoreBoard = require('./components/scoreBoard'),
  scorelist = require('./components/scorelist');

var
  template = require('../template');

var
  MLB = require('../../data/mlb');

var mlb = template.kind({
  displayComponents: [
    {classes: 'inline', components: [
      {name: 'awayTeam', kind: Team},
      {name: 'scoreboard', kind: ScoreBoard},
      {name: 'homeTeam', kind: Team}
    ]}
  ],
  controlComponents: [
    {
      classes: 'inline',
      components: [
        {name: 'prev', kind: IconButton, icon: 'arrowsmallleft', ontap: 'prevTapped'},
        {classes: 'moon-8h'},
        {name: 'datePicker', kind: DatePicker, minYear: 1970, maxYear: 2016, content: 'Date', onChange: 'onDateChange'},
        {classes: 'moon-8h'},
        {name: 'next', kind: IconButton, icon: 'arrowsmallright', ontap: 'nextTapped'}
      ]
    },
    {name: 'scorelist', kind: scorelist}
  ],
  create: function() {
    this.index = -1;
    this.dataArr = [];
    template.prototype.create.apply(this, arguments);
  },
  dataChanged: function() {
    this.set('date', this.data.date || new Date());
    this.set('team', this.data.team);
  },
  dateChanged: function() {
    var m = this.date.getMonth() + 1,
        d = this.date.getDate(),
        mlb = new MLB(),
        option;

    // add leading zero to months
    if (m < 10) {
      m = '0' + m;
    }

    // add leading zero to date
    if (d < 10) {
      d = '0' + d;
    }

    option = {
      // path: 'year_2016/month_04/day_09/'
      path: 'year_' + this.date.getFullYear() + '/month_' + m + '/day_' + d + '/'
    };

    // reset index
    this.index = -1;
    mlb.getScoreboard(option, this.success.bind(this), this.err.bind(this));
    this.$.datePicker.set('value', this.date);
  },
  success: function(sender, res) {
    this.dataArr.length = 0;

    var games = res.data.games && res.data.games.game || [],
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
          save_pitcher: game.save_pitcher,
          status: game.status.status, // "Final", "Postponed", "Cancelled"
          reason: game.status.reason
        },
        summary: {
          home: game.home_name_abbrev,
          away: game.away_name_abbrev,
          homeRun: game.linescore ? game.linescore.r.home : null,
          awayRun: game.linescore ? game.linescore.r.away : null
        }
      };
      this.dataArr.push(data);
    }

    this.$.scorelist.set('collection', this.dataArr.map(function(data) {return data.summary;}));

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

    if (this.dataArr.length > 0) {
      this.$.awayTeam.set('data', this.dataArr[this.index].away);
      this.$.homeTeam.set('data', this.dataArr[this.index].home);

      this.$.scoreboard.set('score', this.dataArr[this.index].score);
    } else {
      this.$.awayTeam.clear();
      this.$.homeTeam.clear();
      this.$.scoreboard.clear();
    }
  },
  onDateChange: function(sender, ev) {
    this.set('date', ev.value);
  }
});

module.exports = mlb;