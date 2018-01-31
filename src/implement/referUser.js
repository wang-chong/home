const connection = require('./../sql/connection')

module.exports = function (req, res) {
  var userName = req.query.userName
  var sql = `SELECT \`name\` AS userName,\`user_id\` AS userId FROM \`user\` 
            where \`delete\`=0 ${userName
                                ? ` and \`name\`="${userName}"`
                                : ''}`
  connection.query(sql, function (error, results, fields) {
    if (error) throw error
    res.send(results)
  })
}
