const env = 'dev';
const envObj = {
  dev: {
    domain: 'http://localhost:3000'
  },
  production: {
    domain: 'http://www.wchong.com'
  }
};
export default function globalConfig() {
  // 全局变量，指向src目录
  global.src = `${process.cwd()}/src/`;
  global.domain = envObj[env].domain;
}
