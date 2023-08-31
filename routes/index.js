const productsRoute = require('./productsRouter');

function routerApi(app) {
  app.use('/products', productsRoute)
}

module.exports = routerApi;
