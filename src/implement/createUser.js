const connection = require('./../sql/connection')

module.exports = function (req, res) {
  if (req.body && req.body.userName) {
    var userInfo = []
    userInfo.push(req.body.userName)
    userInfo.push((function () {
      var date = new Date()
      var userId = []
      userId.push('U')
      userId.push(date.getTime())
      return userId.join('')
    })())
    var sql = 'INSERT INTO `user` (name, user_id) VALUES ("' + userInfo.join('","') + '")'
    connection.query(sql, function (error, results, fields) {
      if (error) throw error
      res.send(true)
    })
  } else {
    res.status(500).send({
      error:'用户名为空'
    })
  }
}
