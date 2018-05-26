import request from 'request';

import connection from './../../sql/connection';

import Hcore from './../../utils/Hcore';

function getUsersByUserName(res, userName) {
  return new Promise((resolve, reject) => {
    // 查询数据库
    request({
      url: 'http://localhost:3000/user/referUser',
      method: 'GET',
      qs: {
        userName
      }
    }, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        resolve(body);
      } else {
        reject();
        Hcore.sendError({
          msg: '查询出错',
          res
        });
      }
    });
  });
}

export default function (req, res) {
  const { userName } = req.body;
  if (req.body && userName) {
    // 查询用户名是否已经存在，先根据用户名查询用户数据
    getUsersByUserName(res, userName)
      .then((results) => {
        if (results.length > 0) {
          Hcore.sendError({
            msg: '用户名已存在',
            res
          });
        } else {
          const stampId = `U${Date.now()}`;
          const userId = `${stampId.substring(0, 5)}${stampId.substring(10)}`;
          const sql = `INSERT INTO \`user\` (name, user_id) VALUES ("${userName}","U${userId}")`;
          connection.query(sql, (error) => {
            if (error) throw error;
            res.send(true);
          });
        }
      })
      .catch(() => {
        Hcore.sendError({
          msg: '创建失败',
          res
        });
      });
  } else {
    Hcore.sendError({
      msg: '用户名不能为空',
      res
    });
  }
}
