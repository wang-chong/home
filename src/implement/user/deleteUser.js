import connection from './../../sql/connection';

// 删除指定用户名的数据
export default function (req, res) {
  if (req.query.userName) {
    const sql = `DELETE FROM \`user\` WHERE \`name\` = "${req.query.userName}"`;
    connection.query(sql, (error) => {
      if (error) throw error;
      res.send(true);
    });
  } else {
    throw new Error('删除用户-用户名有误');
  }
}
