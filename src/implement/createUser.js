const request = require('request')
const connection = require('./../sql/connection')
const Hcore = require('./../common/Hcore')
const referUser = require('./referUser')

function getUsersByUserName (res, userName) {
  return new Promise((resolve, reject) => {
    // 查询数据库
    request({
      url: 'http://localhost:3000/user/referUser',
      method: 'GET',
      qs: {
        userName: userName
      }
    }, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        resolve(body)
      } else {
        Hcore.sendError({
          msg: '查询出错',
          res: res
        })
      }
    })
  })
}

module.exports = function (req, res) {
  const userName = req.body.userName
  if (req.body && userName) {
    // 查询用户名是否已经存在，先根据用户名查询用户数据
    getUsersByUserName(res, userName)
    .then((results) => {
      if (results.length > 0) {
        Hcore.sendError({
          msg: '用户名已存在',
          res: res
        })
      } else {
        var sql = `INSERT INTO \`user\` (name, user_id) VALUES ("${userName}","U${new Date().getTime()}")`
        connection.query(sql, function (error, results, fields) {
          if (error) throw error
          res.send(true)
        })
      }
    })
    .catch((error) => {
      Hcore.sendError({
        msg: '创建失败',
        res: res
      })
    })
  } else {
    Hcore.sendError({
      msg: '用户名不能为空',
      res: res
    })
  }
}
