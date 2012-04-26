/**
 * Module dependencies.
 */
var express = require('express');
var util    = require('util');

var MemStore = express.session.MemoryStore;

/**
 * Create an express server
 */

var app = express.createServer(
  express.logger(),
  express.static(__dirname + '/public'),
  express.bodyParser(),
  express.cookieParser(),
  // set this to a secret value to encrypt session cookies
  express.session({ secret: process.env.SESSION_SECRET || 'secret123' })
);

/**
 * Configuration
 */

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.use(express.cookieParser());
  app.use(express.session({secret: 'some hard secret', store: MemStore({reapInterval: 60000*10})}));

  // disable layout
  app.set("view options", {layout: false});

  // make a custom html template
  app.register('.html', {
    compile: function(str, options){
      return function(locals){
        return str;
      };
    }
  });
});

// listen to the PORT given to us in the environment
var port = process.env.PORT || 5000;

app.listen(port, function() {
  console.log("Listening on " + port);
});

app.dynamicHelpers({
  'host': function(req, res) {
    return req.headers['host'];
  },
  'scheme': function(req, res) {
    req.headers['x-forwarded-proto'] || 'http'
  },
  'url': function(req, res) {
    return function(path) {
      return app.dynamicViewHelpers.scheme(req, res) + app.dynamicViewHelpers.url_no_scheme(path);
    }
  },
  'url_no_scheme': function(req, res) {
    return function(path) {
      return '://' + app.dynamicViewHelpers.host(req, res) + path;
    }
  },
});


app.get('/login', function(req, res){
  res.render('login.html', {
    layout:    false,
    req:       req,
  });
});
app.get('/register', function(req, res){
  res.render('register.html', {
    layout:    false,
    req:       req,
  });
});
//require('./routes/handler').routes(app);
