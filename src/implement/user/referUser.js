import connection from './../../sql/connection';

export default function (req, res) {
  const { userName } = req.query;
  const sql = `SELECT \`name\` AS userName,\`user_id\` AS userId FROM \`user\` 
            where \`delete\`=0 ${userName
    ? ` and \`name\`="${userName}"`
    : ''}`;
  connection.query(sql, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
}
