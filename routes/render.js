var config = require('../config.json');
try {
  var db = require('../models/db.json');
  var users = require('../models/users.json').users;
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

var renderLoginJSON = function(req, res) {

  var reqBody = req.body;
  var i, length = users.length;
  
  if (reqBody.email && reqBody.password) {
    
    for (i = 0; i < length; i++) {
      
      if (users[i] && 
          users[i].email && 
          users[i].email === reqBody.email &&
          users[i].password &&
          users[i].password === reqBody.password ) {
        res.json({
          status: true
        });
      }
    }
  }
  res.json({
    status: false
  });
};

module.exports = {
  renderApp: renderApp,
  renderJSON: renderJSON,
  renderLoginJSON: renderLoginJSON,
  renderProductsJSON: renderProductsJSON
};
