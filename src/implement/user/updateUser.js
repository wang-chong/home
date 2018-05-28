import connection from './../../sql/connection';

// 更新指定用户的删除标志位为1，软删除
export default function (userName) {
  return new Promise((resolve) => {
    try {
      if (userName) {
        const sql = `UPDATE \`user\` set \`delete\`=1 where \`name\`="${userName}"`;
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
        throw new Error('没有此用户');
      }
    } catch (e) {
      resolve({
        err: true,
        msg: e.message
      });
    }
  });
}
