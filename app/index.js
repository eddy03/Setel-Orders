module.exports = app => {
  const healthCtrl = require('./controllers/health')(app)
  const authCtrl = require('./controllers/auth')(app)
  const ordersCtrl = require('./controllers/orders')(app)

  const isValidMiddleware = require('./middleware/is-valid')(app)

  app.get('/health', healthCtrl.check)

  app.post('/auth', authCtrl.login)

  app.route('/orders')
    .get(isValidMiddleware, ordersCtrl.getOrders)
    .post(isValidMiddleware, ordersCtrl.newOrders)

  app.route('/orders/:orderId')
    .get(isValidMiddleware, ordersCtrl.getOrder)
    .delete(isValidMiddleware, ordersCtrl.cancelOrder)
}
