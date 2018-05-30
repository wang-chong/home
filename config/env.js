// 在此处添加配置，必须在production文件同步添加一项
const env = 'dev';
// session过期时间
const sessionExpire = 1 * 60; // 1分钟
// 网站域名
const domain = 'http://localhost:3000';
// redis服务器的ip
const redisIp = '127.0.0.1';
// redis服务器的端口号
const redisPort = '6379';
// redis密码
const redisPass = 'root@2016';
// session加密密匙
const sessionSecret = 'ff@2016';
// 服务的端口
const servePort = 3000;
// 数据库名
const sqlName = 'root';
// 数据库密码
const sqlPw = 'root';
// 数据库地址
const sqlHost = 'localhost';
export {
  env,
  sessionExpire,
  domain,
  redisIp,
  redisPort,
  redisPass,
  sessionSecret,
  servePort,
  sqlName,
  sqlPw,
  sqlHost
};
