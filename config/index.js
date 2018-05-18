const env = 'dev';
const envObj = {
  dev: {
    domain: 'http://localhost:3000'
  },
  production: {
    domain: 'http://www.wchong.com'
  }
};
module.exports = function () {
  // 全局变量，指向src目录
  global._src = process.cwd() + '/src/';
  global._domain = envObj[env].domain;
}