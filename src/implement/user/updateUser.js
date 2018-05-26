import connection from './../../sql/connection';

// 更新指定用户的删除标志位为1，软删除
export default function (req, res) {
  if (req.body.userName) {
    const sql = `UPDATE \`user\` set \`delete\`=1 where \`name\`="${req.body.userName}"`;
    connection.query(sql, (error) => {
      if (error) throw error;
      res.send(true);
    });
  } else {
    throw new Error('没有此用户');
  }
}
