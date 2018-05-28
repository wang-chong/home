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
        global.logger.error(error);
        reject();
      }
    });
  });
}

export default async function (req, res) {
  const { userName } = req.body;
  if (req.body && userName) {
    // 查询用户名是否已经存在，先根据用户名查询用户数据
    const result = await getUsersByUserName(res, userName);
    if (!result) {
      Hcore.sendError({
        msg: '创建失败',
        res
      });
    } else if (result.length > 0) {
      Hcore.sendError({
        msg: '用户名已存在',
        res
      });
    } else {
      const stampId = `U${Date.now()}`;
      const userId = `${stampId.substring(0, 3)}${stampId.substring(8)}`;
      const sql = `INSERT INTO \`user\` (name, user_id) VALUES ("${userName}","U${userId}")`;
      connection.query(sql, (error) => {
        if (error) {
          global.logger.error(error);
          res.send(false);
        } else {
          res.send(false);
        }
      });
    }
  } else {
    Hcore.sendError({
      msg: '用户名不能为空',
      res
    });
  }
}
