module.exports = app => {
  const authCtrl = {}

  authCtrl.login = (req, res) => {
    res.json({ success: true })
  }

  return authCtrl
}
