// Require our dependencies
var express = require('express'),
    exphbs = require('express-handlebars'),
    http = require('http'),
    config = require('./config.json');

// Create an express instance and set a port variable
var app = express();
var port = process.env.PORT || config.port || 4000;

// Set handlebars as the templating engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Disable etag headers on responses - eTag(entity Tag) is a header which caches on browser
app.disable('etag');

app.use("/public/", express.static(__dirname + "/public/", {
  etag: false
}));
app.use("/src/", express.static(__dirname + "/src/", {
  etag: false
}));
app.use("/node_modules/", express.static(__dirname + "/node_modules/", {
  etag: false
}));

// Load core-routes express routes by passing express instance
var coreRoutes = require('./routes/core-routes')(app);

// Fire this bitch up (start our server)
var server = http.createServer(app).listen(port, function() {
  console.log('Express server listening on port ' + port);
});