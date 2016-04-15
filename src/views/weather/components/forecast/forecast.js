var
  Control = require('enyo/Control'),
  DataList = require('enyo/DataList'),
  Binding = require('enyo/Binding'),
  PassiveBinding = Binding.PassiveBinding;

var
  weathericon = require('../../weathericon');

var forecasticon = Control.kind({
  classes: 'wi',
  code: '',
  create: function() {
    Control.prototype.create.apply(this, arguments);
    this.codeChanged();
  },
  codeChanged: function() {
    this.addClass(weathericon.setWeatherIcon(this.code));
  }
});

var forecast = Control.kind({
  classes: 'forecast',
  components: [
    {name: 'list', classes: 'forecastlist', kind: DataList, defaultBindingKind: PassiveBinding, components: [
      {components: [
        {classes: 'inline', components: [
          {name: 'date'},
          {name: 'day'},
          {name: 'icon', kind: forecasticon},
          {name: 'high'},
          {name: 'low'}
        ]}
      ],
      bindings: [
        {from: 'model.code', to: '$.icon.code'},
        {from: 'model.date', to: '$.date.content', transform: function(d) {
          var dd = d.split(' ');
          return dd[1] + ' ' + dd[0];
        }},
        {from: 'model.day', to: '$.day.content'},
        {from: 'model.high', to: '$.high.content', transform: function(t) {return t + '\u00B0';}},
        {from: 'model.low', to: '$.low.content', transform: function(t) {return t + '\u00B0';}}
      ]}
    ]}
  ],
  dataChanged: function() {
    this.$.list.set('collection', this.data);
  }
});

module.exports = forecast;

      // {
      //  "code": "32",
      //  "date": "15 Apr 2016",
      //  "day": "Fri",
      //  "high": "35",
      //  "low": "25",
      //  "text": "Sunny"
      // }