const axios = require('axios')

module.exports = app => {
  const modelMethod = {}

  modelMethod.create = data => {
    return axios.post(`${process.env.PAYMENTS_SERVICE_API}/payments`, data)
      .then(response => (response.data))
  }

  modelMethod.findOne = orderId => {
    return axios.get(`${process.env.PAYMENTS_SERVICE_API}/payments`, { params: { orderId } })
      .then(response => (response.data))
  }

  return modelMethod
}
