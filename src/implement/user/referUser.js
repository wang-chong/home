import connection from './../../sql/connection';

export default function (userName) {
  return new Promise((resolve) => {
    try {
      const sql =
        `SELECT \`name\` AS userName,\`user_id\` AS userId FROM \`user\` 
        where \`delete\`=0 ${userName ? ` and \`name\`="${userName}"` : ''}`;
      connection.query(sql, (e, results) => {
        if (e) {
          resolve({
            err: true,
            msg: e.message
          });
        }
        resolve(results);
      });
    } catch (e) {
      resolve({
        err: true,
        msg: e.message
      });
    }
  });
}
