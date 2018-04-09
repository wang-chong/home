var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'vh_user'
})
console.log('sql connect')
connection.connect()

module.exports = connection