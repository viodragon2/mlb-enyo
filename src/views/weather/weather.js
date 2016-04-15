var
  template = require('../template');

var
  Icon = require('moonstone/Icon');

var
  forecast = require('./components/forecast');

var
  weathericon = require('./weathericon');

var weather = template.kind({
  classes: 'weather',
  displayComponents: [
    {classes: 'inline top', components: [
      {classes: 'left', components: [
        {name: 'city', classes: 'city'},
        {name: 'country', classes: 'country'}
      ]},

      {components: [
        {classes: 'inline', components: [
          {name: 'icon', classes: 'icon wi'},
          {name: 'text', classes: 'text'}
        ]},
        {classes: 'inline', components: [
          {kind: Icon, icon: 'arrowlargeup'},
          {name: 'high', classes: 'high s-temp'},
          {kind: Icon, icon: 'arrowlargedown'},
          {name: 'low', classes: 's-temp'}
        ]},
      ]},
      {classes: 'moon-1h'},
      {name: 'temp', classes: 'temp'}
    ]}
  ],
  controlComponents: [
    {classes: 'inline top', components: [
      {components: [
        {classes: 'label', content: 'Forecast'},
        {name: 'forecast', classes: 'column',kind: forecast},
      ]},
      {classes: 'moon-2h'},
      {components: [
        {classes: 'label', content: 'Detail'},
        {name: 'detail', classes: 'column', components: [
          {classes: 'inline detail-item', components: [
            {classes: 'detail-label', content: 'Windchill'},
            {classes: 'detail-value', name: 'windchill'}
          ]},
          {classes: 'inline detail-item', components: [
            {classes: 'detail-label', content: 'Humidity'},
            {classes: 'detail-value', name: 'humidity'}
          ]},
          {classes: 'inline detail-item', components: [
            {classes: 'detail-label', content: 'Visibility'},
            {classes: 'detail-value', name: 'visibility'}
          ]},
          {classes: 'inline detail-item', components: [
            {classes: 'detail-label', content: 'Sunrise'},
            {classes: 'detail-value', name: 'sunrise'}
          ]},
          {classes: 'inline detail-item', components: [
            {classes: 'detail-label', content: 'Sunset'},
            {classes: 'detail-value', name: 'sunset'}
          ]}
        ]}
      ]}
    ]}
  ],
  dataChanged: function() {
    this.$.city.set('content', this.data.location.city);
    this.$.country.set('content', this.data.location.country);
    this.$.icon.addClass(weathericon.setWeatherIcon(this.data.item.condition.code));
    this.$.text.set('content', this.data.item.condition.text);
    this.$.temp.set('content', this.data.item.condition.temp + '\u00B0 ' + this.data.units.temperature);
    this.$.high.set('content', this.data.item.forecast[0].high + '\u00B0');
    this.$.low.set('content', this.data.item.forecast[0].low + '\u00B0');
    this.$.forecast.set('data', this.data.item.forecast);

    this.$.windchill.set('content', this.data.wind.chill + '\u00B0 ' + this.data.units.temperature);
    this.$.humidity.set('content', this.data.atmosphere.humidity + '%');
    this.$.visibility.set('content', this.data.atmosphere.visibility + this.data.units.distance);
    this.$.sunrise.set('content', this.data.astronomy.sunrise);
    this.$.sunset.set('content', this.data.astronomy.sunset);
  }
});

module.exports = weather;