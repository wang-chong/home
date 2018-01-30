const connection = require('./../sql/connection')

// 删除指定用户名的数据
module.exports = function (req, res) {
  if (req.query.userName) {
    var sql = 'DELETE FROM `user` WHERE `name` = "' + req.query.userName + '"'
    connection.query(sql, function (error, results, fields) {
      if (error) throw error
      res.send(true)
    })
  } else {
    throw new Error('删除用户-用户名有误')
  }
}
