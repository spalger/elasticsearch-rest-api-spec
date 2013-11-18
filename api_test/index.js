var fs = require('fs');
var path = require('path');

var api = {};
var apiDir = path.join(__dirname, '../api/');
fs.readdirSync(apiDir).forEach(function (filename) {
  var endpoint = require(apiDir + filename);
  var name = Object.keys(endpoint).shift();
  api[name] = endpoint[name];
});

describe('api methods', function () {
  Object.keys(api).forEach(function (name) {
    var endpoint = api[name];

    if (~endpoint.methods.indexOf('DELETE') && endpoint.methods.length > 1) {
      console.log(endpoint.methods);
    }

    describe(name, function () {
      it('DELETE endpoints should not any other option besides POST', function () {
        if (~endpoint.methods.indexOf('DELETE') && endpoint.methods.length > 1) {
          endpoint.methods.should.eql(['DELETE', 'POST']);
        }
      });
    });
  });
});
