var express = require('express');
var proxy = require('express-http-proxy');

var app = express();
var basedir = __dirname;
if(process.argv[2] === 'dist') {
  basedir = basedir + '/app/client/dist/';
}
app.use(express.static(basedir));
app.use('', proxy('http://localhost:4567', {
  forwardPath: function(req, res) {
    return require('url').parse(req.url).path;
  }
}));
app.listen(8000);
