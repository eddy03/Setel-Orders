const _ = require('lodash')
const async = require('async')

module.exports = app => {
  const ordersModel = require('../models/orders')(app)
  const paymentsModel = require('../models/payments')(app)

  const sequelize = app.DB.sequelize

  const ordersCtrl = {}

  ordersCtrl.getOrders = async (req, res) => {
    try {
      const orders = await req.account.getOrders()
      const responses = []
      await new Promise((resolve, reject) => {
        // Not good if a looootttss
        async.each(orders, async order => {
          const payment = await paymentsModel.findOne(order.id)

          const response = _.pick(order, ['id', 'description', 'status', 'createdAt'])
          response.payment = _.pick(payment, ['id', 'createdAt'])

          responses.push(response)
        }, err => err ? reject(err) : resolve())
      })

      res.json(responses)
    } catch (err) {
      res.status(500).json({ msg: 'There is an error' })
    }
  }

  ordersCtrl.newOrders = async (req, res) => {
    try {
      const { description } = req.body

      let response = {}

      await sequelize.transaction(async transaction => {
        const order = await ordersModel.create({ description }, { transaction })
        const payment = await paymentsModel.create({ orderId: order.id })

        order.paymentId = payment.id
        order.status = payment.isSuccess === true ? 'success' : 'failed'

        await order.save({ transaction })
        await req.account.addOrders(order, { transaction })

        response = _.pick(order, ['id', 'status'])
        response.paymentId = payment.id

        return null
      })

      res.json(response)
    } catch (err) {
      console.error(err.toString())
      res.status(500).json({ msg: 'There is an error' })
    }
  }

  ordersCtrl.getOrder = (req, res) => {

  }

  ordersCtrl.cancelOrder = (req, res) => {

  }

  return ordersCtrl
}
