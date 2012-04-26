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
  express.static(__dirname + '/public')
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


require('./routes/handler').routes(app);
