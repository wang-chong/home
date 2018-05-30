import encodeText from './encodeText';
import connection from './../../sql/connection';
import referUser from './../user/referUser';

function getUsersByUserName(userName) {
  return new Promise((resolve) => {
    // 查询数据库
    referUser(userName)
      .then((result) => {
        resolve(result);
      });
  });
}

export default async function (userName, password) {
  return new Promise(async (resolve) => {
    try {
      if (userName && password) {
        // 查询用户名是否已经存在，先根据用户名查询用户数据
        const result = await getUsersByUserName(userName);
        if (result && result.err) {
          throw new Error(result.msg);
        } else if (result.length > 0) {
          throw new Error('用户名已存在');
        } else {
          const pw = encodeText(password);
          const stampId = `U${Date.now()}`;
          const userId = `${stampId.substring(0, 2)}${stampId.substring(7)}`;
          const sql = `INSERT INTO \`user\` (name, user_id, password) VALUES ("${userName}","${userId}","${pw}")`;
          connection.query(sql, (error) => {
            if (error) {
              resolve({
                err: true,
                msg: error.message
              });
            }
            resolve(true);
          });
        }
      } else {
        throw new Error('用户名/密码不能为空');
      }
    } catch (error) {
      resolve({
        err: true,
        msg: error.message
      });
    }
  });
}
