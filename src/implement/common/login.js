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

function checkUserNameWithPassword(userName, password) {
  return new Promise((resolve) => {
    const sql = `SELECT user_id AS userId FROM \`user\` WHERE \`name\`="${userName}" AND \`password\`="${password}"`;
    connection.query(sql, (error, result) => {
      if (error) {
        resolve({
          err: true,
          msg: error.message
        });
      }
      resolve(result);
    });
  });
}

export default async function (userName, password) {
  return new Promise(async (resolve) => {
    try {
      if (userName) {
        // 查询用户名是否已经存在，先根据用户名查询用户数据
        const result = await getUsersByUserName(userName);
        if (result && result.err) {
          throw new Error(result.msg);
        } else if (result.length > 0) {
          // 判断密码是否一致
          const checkResult = await checkUserNameWithPassword(userName, password);
          if (checkResult && checkResult.err) {
            throw new Error(result.msg);
          } else {
            resolve(checkResult);
          }
        } else {
          throw new Error('用户不存在');
        }
      } else {
        throw new Error('用户名不能为空');
      }
    } catch (error) {
      resolve({
        err: true,
        msg: error.message
      });
    }
  });
}
