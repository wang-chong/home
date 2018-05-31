import mysql from 'mysql';
import { sqlName, sqlPw, sqlHost } from './../../config/env';

// 重连方案
// const mysqlConnect = {
//   query(sql, cb) {
//     const db = mysql.createConnection({
//       host: sqlHost,
//       user: sqlName,
//       password: sqlPw,
//       database: 'vh_user'
//     });
//     db.connect();
//     db.on('error', (err) => {
//       global.logger.error(err);
//       // 尝试重连
//       const timeout = setTimeout(() => {
//         db.connect();
//         clearInterval(timeout);
//       }, 3000);
//     });
//     db.query(sql, cb);
//     db.end();
//   }
// };

// 连接池方案
const pool = mysql.createPool({
  host: sqlHost,
  user: sqlName,
  password: sqlPw,
  database: 'vh_user'
});

const mysqlConnect = {
  query(sql, cb) {
    pool.getConnection((err, conn) => {
      if (err) {
        cb(err, null, null);
      } else {
        conn.query(sql, (qerr, vals, fields) => {
          // 释放连接
          conn.release();
          // 事件驱动回调
          cb(qerr, vals, fields);
        });
      }
    });
  }
};

export default mysqlConnect;
