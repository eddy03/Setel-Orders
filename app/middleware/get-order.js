const _ = require('lodash')

module.exports = app => async (req, res, next) => {
  try {
    const { orderId } = req.params

    const orders = await req.account.getOrders({ where: { id: orderId }, limit: 1 })

    if (_.isEmpty(orders)) {
      return res.status(404).json({ msg: 'Order cannot be found' })
    }

    req.order = orders[0]
    next()
  } catch (err) {
    res.status(500).json({ msg: 'There is an error' })
  }
}
