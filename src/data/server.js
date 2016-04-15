var
  Control = require('enyo/Control'),
  Ajax = require('enyo/Ajax');

var internals = {};

// http://97371f5f.ngrok.io/data?id=X1234

internals.server = {
  "host": "97371f5f.ngrok.io",
  "protocol": "http"
};

internals.baseUrl = internals.server.protocol + '://' + internals.server.host;

var server = Control.kind({

  getDataById: function(id, success, err) {
    this.fetch(id, success, err);
  },

  addData: function(data, success, err) {
    var url = internals.baseUrl + '/addData?data=' + JSON.stringify(data);
    var ajax = new Ajax({
      url: url,
      timeout: 10000
    });
    ajax.go();
    ajax.response(this, success);
    ajax.error(this, err);
  },

  fetch: function(id, success, err) {
    var url = internals.baseUrl + '/data?id=' + id;
    var ajax = new Ajax({
      url: url,
      timeout: 10000
    });
    ajax.go();
    ajax.response(this, success);
    ajax.error(this, err);
  }
});

module.exports = server;