var
  DataList = require('enyo/DataList'),
  Binding = require('enyo/Binding'),
  PassiveBinding = Binding.PassiveBinding;

var scorelist = DataList.kind({
  classes: 'scorelist',
  orientation: 'horizontal',
  defaultBindingKind: PassiveBinding,
  components: [
    {
      classes: 'scorelist-item',
      components: [
        {classes: 'inline', components: [
          {name: 'away', classes: 'name'},
          {name: 'awayRun', classes: 'score'}
        ]},
        {classes: 'inline', components: [
          {name: 'home', classes: 'name'},
          {name: 'homeRun', classes: 'score'}
        ]}
      ],
      bindings: [
        {from: 'model.away', to: '$.away.content'},
        {from: 'model.awayRun', to: '$.awayRun.content'},
        {from: 'model.home', to: '$.home.content'},
        {from: 'model.homeRun', to: '$.homeRun.content'},
        {from: 'model.status', to: '$.status.content'}
      ]
    }
  ]
});

module.exports = scorelist;