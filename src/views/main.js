var
  Control = require('enyo/Control');

var
  IconButton = require('moonstone/IconButton'),
  Scroller = require('moonstone/Scroller'),
  DatePicker = require('moonstone/DatePicker');

var
  Team = require('./components/team'),
  ScoreBoard = require('./components/scoreBoard');

var
  MLB = require('../data/mlb');

var main = Control.kind({
  classes: 'moon main enyo-fit',
  components: [
    {classes: 'main-header'},
    {classes: 'inline main-display', kind: Control, components: [
      {name: 'awayTeam', kind: Team},
      {name: 'scoreboard', kind: ScoreBoard},
      {name: 'homeTeam', kind: Team},
    ]},

    {kind: Scroller, classes: 'main-controller enyo-fill', components: [
      {
        classes: 'inline',
        components: [
          {name: 'prev', kind: IconButton, icon: 'arrowsmallleft', ontap: 'prevTapped'},
          {name: 'next', kind: IconButton, icon: 'arrowsmallright', ontap: 'nextTapped'},
          {name: 'datePicker', kind: DatePicker, maxYear: 2016, content: 'Date', onChange: 'onDateChange'}
        ]
      }
    ]}
  ],
  setDate: function(date) {
    this.date = date;

    if (!this.date) {
      var yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      this.date = yesterday;
    }

    this.$.datePicker.set('value', this.date);
  },
  create: function() {
    Control.prototype.create.apply(this, arguments);
    this.index = -1;
    this.dataArr = [];
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
    var m = ev.value.getMonth() + 1,
        d = ev.value.getDate(),
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
      path: 'year_' + ev.value.getFullYear() + '/month_' + m + '/day_' + d + '/'
    };

    // reset index
    this.index = -1;
    mlb.getScoreboard(option, this.success.bind(this), this.err.bind(this));
  }
});

module.exports = main;