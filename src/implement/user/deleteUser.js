import connection from './../../sql/connection';

// 删除指定用户名的数据
export default function (userName) {
  return new Promise((resolve) => {
    try {
      if (userName) {
        const sql = `DELETE FROM \`user\` WHERE \`name\` = "${userName}"`;
        connection.query(sql, (e) => {
          if (e) {
            resolve({
              err: true,
              msg: e.message
            });
          }
          resolve(true);
        });
      } else {
        throw new Error('请输入用户名');
      }
    } catch (e) {
      resolve({
        err: true,
        msg: e.message
      });
    }
  });
}
