const connection = require('./../sql/connection')

module.exports = function (req, res) {
  var sql = 'SELECT `name` AS userName,`user_id` AS userId FROM `user` where `delete`=0'
  connection.query(sql, function (error, results, fields) {
    if (error) throw error
    res.send(results)
  })
}
