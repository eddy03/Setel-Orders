require('dotenv').config()

const app = require('express')()
const bodyParser = require('body-parser')
const cors = require('cors')
const _ = require('lodash')
const bcrypt = require('bcrypt')

const application = require('./app')
const DB = require('./db');

(async () => {
  try {
    if (process.env.DEV === 'true') {
      console.info('Running on debug mode')
      const morgan = require('morgan')
      app.use(morgan('dev'))
    }

    app.use(bodyParser.json())
    app.use(cors())

    const db = await DB()

    if (_.isUndefined(db)) {
      // Something error with database
      return null
    }

    app.DB = db

    app.DB.sequelize.sync({force: true})
    await app.DB.accounts.create({
      email: 'eddytech03@gmail.com',
      password: await bcrypt.hash('abcd1234', 10)
    })

    application(app)

    app.listen(process.env.PORT, '127.0.0.1', err => {
      if (err) {
        return console.error('Error bootup', err.toString())
      }
      console.log(`Application up at 127.0.0.1:${process.env.PORT}`)
    })
  } catch (err) {
    console.error(err.toString())
  }
})()
