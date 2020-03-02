module.exports = app => {
  const healthCtrl = require('./controllers/health')(app)
  const authCtrl = require('./controllers/auth')(app)
  const ordersCtrl = require('./controllers/orders')(app)

  const isValidMiddleware = require('./middleware/is-valid')(app)
  const getOrderMiddleware = require('./middleware/get-order')(app)

  app.get('/health', healthCtrl.check)

  app.post('/auth', authCtrl.login)

  app.route('/orders')
    .get(isValidMiddleware, ordersCtrl.getOrders)
    .post(isValidMiddleware, ordersCtrl.newOrders)

  app.route('/orders/:orderId')
    .get(isValidMiddleware, getOrderMiddleware, ordersCtrl.getOrder)
    .delete(isValidMiddleware, getOrderMiddleware, ordersCtrl.cancelOrder)
}
