const connection = require('./../sql/connection')

// 更新指定用户的删除标志位为1，软删除
module.exports = function (req, res) {
  if (req.body.userName) {
    var sql = 'UPDATE `user` set `delete`=1 where `name`="' + req.body.userName + '"'
    connection.query(sql, function (error, results, fields) {
      if (error) throw error
      res.send(true)
    })
  } else {
    throw new Error('没有此用户')
  }
}
