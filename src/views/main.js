var
  Control = require('enyo/Control');

var
  mlb = require('./mlb'),
  movie = require('./movie'),
  weather = require('./weather');

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
        this.createComponent({
          template: template,
          kind: movie,
          data: data
        }).render();
        break;
      case 'weather':
        data = {
          "query": {
            "count": 1,
            "created": "2016-04-15T04:39:51Z",
            "lang": "en-US",
            "results": {
             "channel": {
              "units": {
               "distance": "mi",
               "pressure": "in",
               "speed": "mph",
               "temperature": "F"
              },
              "title": "Yahoo! Weather - Nome, AK, US",
              "link": "http://us.rd.yahoo.com/dailynews/rss/weather/Country__Country/*https://weather.yahoo.com/country/state/city-2460286/",
              "description": "Yahoo! Weather for Nome, AK, US",
              "language": "en-us",
              "lastBuildDate": "Thu, 14 Apr 2016 08:39 PM AKDT",
              "ttl": "60",
              "location": {
               "city": "Nome",
               "country": "United States",
               "region": " AK"
              },
              "wind": {
               "chill": "36",
               "direction": "248",
               "speed": "4"
              },
              "atmosphere": {
               "humidity": "81",
               "pressure": "1004.0",
               "rising": "0",
               "visibility": "16.1"
              },
              "astronomy": {
               "sunrise": "7:28 am",
               "sunset": "10:37 pm"
              },
              "image": {
               "title": "Yahoo! Weather",
               "width": "142",
               "height": "18",
               "link": "http://weather.yahoo.com",
               "url": "http://l.yimg.com/a/i/brand/purplelogo//uh/us/news-wea.gif"
              },
              "item": {
               "title": "Conditions for Nome, AK, US at 07:00 PM AKDT",
               "lat": "64.499474",
               "long": "-165.405792",
               "link": "http://us.rd.yahoo.com/dailynews/rss/weather/Country__Country/*https://weather.yahoo.com/country/state/city-2460286/",
               "pubDate": "Thu, 14 Apr 2016 07:00 PM AKDT",
               "condition": {
                "code": "32",
                "date": "Thu, 14 Apr 2016 07:00 PM AKDT",
                "temp": "35",
                "text": "Sunny"
               },
               "forecast": [
                {
                 "code": "34",
                 "date": "14 Apr 2016",
                 "day": "Thu",
                 "high": "35",
                 "low": "26",
                 "text": "Mostly Sunny"
                },
                {
                 "code": "32",
                 "date": "15 Apr 2016",
                 "day": "Fri",
                 "high": "35",
                 "low": "25",
                 "text": "Sunny"
                },
                {
                 "code": "32",
                 "date": "16 Apr 2016",
                 "day": "Sat",
                 "high": "29",
                 "low": "19",
                 "text": "Sunny"
                },
                {
                 "code": "32",
                 "date": "17 Apr 2016",
                 "day": "Sun",
                 "high": "33",
                 "low": "17",
                 "text": "Sunny"
                },
                {
                 "code": "28",
                 "date": "18 Apr 2016",
                 "day": "Mon",
                 "high": "36",
                 "low": "28",
                 "text": "Mostly Cloudy"
                },
                {
                 "code": "28",
                 "date": "19 Apr 2016",
                 "day": "Tue",
                 "high": "39",
                 "low": "31",
                 "text": "Mostly Cloudy"
                },
                {
                 "code": "30",
                 "date": "20 Apr 2016",
                 "day": "Wed",
                 "high": "40",
                 "low": "35",
                 "text": "Partly Cloudy"
                },
                {
                 "code": "30",
                 "date": "21 Apr 2016",
                 "day": "Thu",
                 "high": "40",
                 "low": "32",
                 "text": "Partly Cloudy"
                },
                {
                 "code": "30",
                 "date": "22 Apr 2016",
                 "day": "Fri",
                 "high": "44",
                 "low": "34",
                 "text": "Partly Cloudy"
                },
                {
                 "code": "30",
                 "date": "23 Apr 2016",
                 "day": "Sat",
                 "high": "42",
                 "low": "32",
                 "text": "Partly Cloudy"
                }
               ],
               "description": "<![CDATA[<img src=\"http://l.yimg.com/a/i/us/we/52/32.gif\"/>\n<BR />\n<b>Current Conditions:</b>\n<BR />Sunny\n<BR />\n<BR />\n<b>Forecast:</b>\n<BR /> Thu - Mostly Sunny. High: 35Low: 26\n<BR /> Fri - Sunny. High: 35Low: 25\n<BR /> Sat - Sunny. High: 29Low: 19\n<BR /> Sun - Sunny. High: 33Low: 17\n<BR /> Mon - Mostly Cloudy. High: 36Low: 28\n<BR />\n<BR />\n<a href=\"http://us.rd.yahoo.com/dailynews/rss/weather/Country__Country/*https://weather.yahoo.com/country/state/city-2460286/\">Full Forecast at Yahoo! Weather</a>\n<BR />\n<BR />\n(provided by <a href=\"http://www.weather.com\" >The Weather Channel</a>)\n<BR />\n]]>",
               "guid": {
                "isPermaLink": "false"
               }
              }
             }
            }
           }
          };
        this.createComponent({
          template: template,
          kind: weather,
          data: data
        }).render();
        break;
      default:
        break;
    }
  }
});

module.exports = main;