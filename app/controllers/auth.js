const _ = require('lodash')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = app => {
  const accountsModel = require('../models/accounts')(app)

  const authCtrl = {}

  authCtrl.login = async (req, res) => {
    try {
      const { email, password } = req.body

      if (_.isEmpty(_.trim(email))) {
        return res.status(400).json({ msg: 'Email is required' })
      } else if (_.isEmpty(password)) {
        return res.status(400).json({ msg: 'Password is required' })
      }

      const account = await accountsModel.findOne({ where: { email: email } })

      if (_.isEmpty(account)) {
        return res.status(404).json({ msg: 'No matching account' })
      }

      try {
        await bcrypt.compare(password, account.password)
      } catch (err) {
        return res.status(404).json({ msg: 'No matching account' })
      }

      const response = _.pick(account, ['id', 'email'])
      response.token = jwt.sign(response, process.env.ENCRYPTION_KEY)

      res.json(response)
    } catch (err) {
      res.status(500).json({ msg: 'There is an error' })
    }
  }

  return authCtrl
}
