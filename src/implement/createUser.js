const connection = require('./../sql/connection')

module.exports = function (req, res) {
  if (req.body && req.body.userName) {
    var sql = `INSERT INTO \`user\` (name, user_id) VALUES ("${req.body.userName}","U${new Date().getTime()}")`
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
