var
  Control = require('enyo/Control');

var pitchers = Control.kind({
  classes: 'inline pitchers',
  components: [
    {name: 'wp'},
    {name: 'lp'},
    {name: 'sp'}
  ],
  setPitchers: function(wp, lp, sp) {
    if (wp && lp && sp) {
      this.$.wp.set('content', 'W: ' + wp.last + ' (' + wp.wins + ' - ' + wp.losses + ')');
      this.$.lp.set('content', 'L: ' + lp.last + ' (' + lp.wins + ' - ' + lp.losses + ')');
      if (sp.last) {
        this.$.sp.set('content', 'S: ' + sp.last + ' (' + sp.saves + ')');
      }
    } else {
      this.$.wp.set('content', null);
      this.$.lp.set('content', null);
      this.$.sp.set('content', null);
    }
  }
});

module.exports = pitchers;