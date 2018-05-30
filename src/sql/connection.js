import mysql from 'mysql';
import { sqlName, sqlPw, sqlHost } from './../../config/env';

const connection = mysql.createConnection({
  host: sqlHost,
  user: sqlName,
  password: sqlPw,
  database: 'vh_user'
});
connection.connect();

export default connection;
