import connection from './../../sql/connection';

export default function () {
  const sql = 'SELECT `name` AS userName,`user_id` AS userId FROM `user` where `delete`=0';
  return new Promise((resolve) => {
    connection.query(sql, (e, results) => {
      if (e) {
        resolve({
          err: true,
          msg: e.message
        });
      }
      resolve(results);
    });
  });
}
