var
  Control = require('enyo/Control');

var
  mlb = require('./mlb'),
  movie = require('./movie');

var main = Control.kind({
  classes: 'moon main enyo-fit',
  setTemplate: function(template, data) {
    switch(template) {
      case 'mlb':
        this.createComponent({
          template: template,
          kind: mlb,
          data: data
        }).render();
        break;
      case 'movie':
        data = {
          "title": "The Sanlkas dflkasjd flkjasl dkfjas lkdlot",
          "year": "1993",
          "runtime": "101 min",
          "director": "David M. Evans",
          "actors": "Tom Guiry, Mike Vitar, Patrick Renna, Chauncey Leopardi",
          "plot": "A new kid in town is taken under the wing of a young baseball prodigy and his team in this coming of age movie set in the summer of 1962. Together, they get themselves into many adventures involving rival teams, lifeguards, and a vicious dog.",
          "rating": "7.8",
          "posterUrl": "http://ia.media-imdb.com/images/M/MV5BMTgyODA5MzQ1MF5BMl5BanBnXkFtZTgwMzYxNzYxMTE@._V1_SX300.jpg",
          "id": "tt0108037",
          "trailerUrl": "v.traileraddict.com/67738"
        };
        this.createComponent({
          template: template,
          kind: movie,
          data: data
        }).render();
        break;
      default:
        break;
    }
  }
});

module.exports = main;