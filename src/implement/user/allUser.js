import connection from './../../sql/connection';

function getAllUser() {
  const sql = 'SELECT `name` AS userName,`user_id` AS userId FROM `user1` where `delete`=0';
  return new Promise((resolve) => {
    connection.query(sql, (error, results) => {
      if (error) {
        console.log(error);
        resolve('查询出错');
      }
      resolve(results);
    });
  });
}

export default async function (req, res) {
  const result = await getAllUser();
  res.send(result);
}
