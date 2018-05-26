import connection from './../../sql/connection';

export default function (req, res) {
  const sql = 'SELECT `name` AS userName,`user_id` AS userId FROM `user` where `delete`=0';
  connection.query(sql, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
}
