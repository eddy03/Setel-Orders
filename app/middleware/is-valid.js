const _ = require('lodash')
const jwt = require('jsonwebtoken')

module.exports = app => async (req, res, next) => {
  try {
    const accountsModel = require('../models/accounts')(app)

    const {authorization} = req.headers

    if (_.isEmpty(_.trim(authorization))) {
      return res.status(401).json({msg: 'Not authenticated'})
    }

    const token = jwt.verify(authorization, process.env.ENCRYPTION_KEY)

    const account = await accountsModel.findOne({where: _.pick(token, ['id', 'email'])})

    if (_.isEmpty(account)) {
      return res.status(401).json({msg: 'Not authenticated'})
    }

    req.account = account

    next()
  } catch (err) {
    res.status(401).json({msg: 'Not authenticated'})
  }
}