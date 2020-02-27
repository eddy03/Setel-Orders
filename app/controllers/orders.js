module.exports = app => {
  const ordersModel = require('../models/orders')(app)

  let ordersCtrl = {}

  ordersCtrl.getOrders = async (req, res) => {
    try {
      const orders = await req.account.getOrders()
      res.json(orders)

    } catch (err) {
      res.status(500).json({msg: 'There is an error'})
    }
  }

  ordersCtrl.newOrders = (req, res) => {
    console.log(require('util').inspect(req.body, {depth: 1, colors: true}))
  }

  ordersCtrl.getOrder = (req, res) => {

  }

  ordersCtrl.cancelOrder = (req, res) => {

  }

  return ordersCtrl

}