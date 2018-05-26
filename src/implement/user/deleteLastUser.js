import connection from './../../sql/connection';

export default function (req, res) {
  const sql = 'DELETE FROM `user` ORDER BY create_time desc LIMIT 1';
  connection.query(sql, (error) => {
    if (error) throw error;
    res.send(true);
  });
}
