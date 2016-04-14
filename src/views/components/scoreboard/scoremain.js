var
  Control = require('enyo/Control');

var scoremain = Control.kind({
  classes: 'score',
  components: [
    {
      name: 'display',
      classes: 'inline',
      components: [
        {classes: 'team-info', components: [
          {name: 'awayName'},
          {name: 'awayRun'}
        ]},
        {name: 'divider', classes: 'moon-2h'},
        {classes: 'team-info', components: [
          {name: 'homeName'},
          {name: 'homeRun'}
        ]}
      ]
    },

    {name: 'status', classes: 'score-status'},

    {name: 'warning', content: 'No Games', showing: false}
  ],
  dataChanged: function() {
    this.$.warning.hide();
    this.$.display.show();
    this.$.homeName.set('content', this.data.home.name);
    this.$.awayName.set('content', this.data.away.name);
    this.$.homeRun.set('content', this.data.home.run);
    this.$.awayRun.set('content', this.data.away.run);

    var isPlayed = this.data.away.run && this.data.home.run,
        status = '';
    if (isPlayed) {
      status = this.data.status;
      if (this.data.reason) {
        status = status + ' : ' + this.data.reason;
      }
    }
    this.$.divider.set('content', isPlayed ? '-': '@');
    this.$.status.set('content', status);
  },
  reset: function() {
    this.$.display.hide();
    this.$.warning.show();
  }
});

module.exports = scoremain;