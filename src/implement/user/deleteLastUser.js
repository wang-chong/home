const connection = require(_src + 'sql/connection')

module.exports = function (req, res) {
  var sql = 'DELETE FROM `user` ORDER BY create_time desc LIMIT 1'
  connection.query(sql, function (error, results, fields) {
    if (error) throw error;
    res.send(true);
  })
}
