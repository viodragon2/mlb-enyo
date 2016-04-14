var
  Control = require('enyo/Control'),
  Image = require('enyo/Image');

var
  BodyText = require('moonstone/BodyText');

var team = Control.kind({
  classes: 'team',
  abbrev: '',
  components: [
    {name: 'logo', classes: 'logo', kind: Image},
    {name: 'record', classes: 'record', kind: BodyText}
  ],
  setRecord: function(win, loss) {
    this.$.record.set('content', '(' + win + ' - ' + loss + ')');
  },
  dataChanged: function() {
    this.set('abbrev', this.data.abbrev);
    this.$.logo.set('src', 'assets/' + this.abbrev + '.png');
    this.setRecord(this.data.win, this.data.loss);
  },
  clear: function() {
    this.set('abbrev', null);
    this.$.record.set('content', null);
    this.$.logo.set('src', null)
  }
});

module.exports = team;