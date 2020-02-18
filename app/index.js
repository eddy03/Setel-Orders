module.exports = app => {
  const healthCtrl = require('./controllers/health')(app)
  const authCtrl = require('./controllers/auth')(app)

  app.get('/health', healthCtrl.check)

  app.post('/auth', authCtrl.login)
}
