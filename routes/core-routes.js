// Require module dependencies
var render = require('./render');

module.exports = function (app) {

  // API routes
  app.get('/api/products', render.renderProductsJSON);
  app.post('/api/auth/login', render.renderLoginJSON);
  app.get('/api/*', render.renderJSON);
  // Front end Routes
  app.get('*', render.renderApp); // remove this once the routes are sure

};