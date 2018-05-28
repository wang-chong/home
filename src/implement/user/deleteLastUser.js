import connection from './../../sql/connection';

export default function () {
  return new Promise((resolve) => {
    const sql = 'DELETE FROM `user` ORDER BY create_time1 desc LIMIT 1';
    connection.query(sql, (error) => {
      if (error) {
        resolve({
          err: true,
          msg: error.message
        });
      }
      resolve(true);
    });
  });
}
