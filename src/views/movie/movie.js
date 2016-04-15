var
  Image = require('enyo/Image');

var
  Marquee = require('moonstone/Marquee'),
  MarqueeText = Marquee.Text,
  MarqueeDecorator = Marquee.Decorator;

var
  template = require('../template');

var movie = template.kind({
  classes: 'movie',
  displayComponents: [
    {classes: 'inline top', components: [
      {name: 'poster', classes: 'poster', kind: Image},
      {classes: 'right', components: [
        {classes: 'inline', components: [
          {kind: MarqueeDecorator, marqueeOnRender: true, components: [
            {name: 'title', kind: MarqueeText, classes: 'title'}
          ]},
          {classes: 'moon-1h'},
          {name: 'year', classes: 'year'},
        ]},
        {classes: 'inline subinfo', components: [
          {name: 'runtime', classes: 'runtime'},
          {classes: 'moon-1h'},
          {classes: 'moon-1h', content: '|'},
          {name: 'rating', class: 'rating'}
        ]},
        {name: 'plot', classes: 'plot'},
        {classes: 'label', content: 'Directors'},
        {classes: 'names', name: 'director'},
        {classes: 'label', content: 'Actors'},
        {classes: 'names', name: 'actors'}
      ]}
    ]}
  ],
  dataChanged: function() {
    this.$.poster.set('src', this.data.posterUrl);
    this.$.title.set('content', this.data.title);
    this.$.runtime.set('content', this.data.runtime);
    this.$.rating.set('content', 'Rating: ' + this.data.rating);
    this.$.year.set('content', '(' + this.data.year + ')');
    this.$.plot.set('content', this.data.plot);
    this.$.director.set('content', this.data.director);
    this.$.actors.set('content', this.data.actors);
  }
});

module.exports = movie;