var config = require('../config.json');
try {
  var db = require('../models/db.json');
}
catch (err) {
  console.log('Error fetching db.json', err);
}

var renderApp = function(req, res) {

    var configJson = {
      apiUrl: config.host,
      isDev: req.app.get('env') === "development"
    };
    res.render('mainProd', configJson);
};

var renderJSON = function(req, res) {
    res.send({
      message: "Hey! API is up"
    });
};

var renderProductsJSON = function(req, res) {
  res.json(db);
};

module.exports = {
  renderApp: renderApp,
  renderJSON: renderJSON,
  renderProductsJSON: renderProductsJSON
};
