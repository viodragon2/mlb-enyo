var
  Control = require('enyo/Control');

var
  Scroller = require('moonstone/Scroller');

var teamplate = Control.kind({
  components: [
    {name: 'header', classes: 'teamplate-header'},
    {name: 'display', classes: 'teamplate-display'},
    {name: 'control', kind: Scroller, classes: 'teamplate-controller enyo-fill'}
  ],
  create: function() {
    Control.prototype.create.apply(this, arguments);

    this.templateChanged();
  },
  templateChanged: function() {
    this.createDisplayComponents();
    this.createControlComponents();
    this.dataChanged();
  },
  createDisplayComponents() {
    var owner = this.hasOwnProperty('displayComponents') ? this.getInstanceOwner() : this;
    this.$.display.createComponents(this.displayComponents, {owner: owner});
  },
  createControlComponents() {
    var owner = this.hasOwnProperty('controlComponents') ? this.getInstanceOwner() : this;
    this.$.control.createComponents(this.controlComponents, {owner: owner});
  },
  dataChanged: function() {}
});

module.exports = teamplate;