const axios = require('axios')
const jwt = require('jsonwebtoken')

const auth = jwt.sign({id: 'ORDER_SERVICE'}, process.env.ENCRYPTION_KEY)

module.exports = app => {
  const modelMethod = {}

  modelMethod.create = data => {
    return axios.post(`${process.env.PAYMENTS_SERVICE_API}/payments`, data, {headers: {Authorization: auth}})
      .then(response => (response.data))
  }

  modelMethod.findOne = orderId => {
    return axios.get(`${process.env.PAYMENTS_SERVICE_API}/payments`, { params: { orderId }, headers: {Authorization: auth} })
      .then(response => (response.data))
  }

  return modelMethod
}
