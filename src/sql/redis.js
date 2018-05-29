import redis from 'redis';

const RDS_PORT = '6379'; // 端口号
const RDS_HOST = '127.0.0.1'; //  服务器IP
const RDS_PWD = 'root2016';
const RDS_OPTS = { auth_pass: RDS_PWD }; // 设置项
const client = redis.createClient(RDS_PORT, RDS_HOST, RDS_OPTS);

client.on('error', (err) => {
  global.logger(err);
});

client.on('ready', () => {
  console.log('redis is ready');
  // 单值的设置与读取
  // client.set('name', 'wchong');
  // client.get('name', redis.print);

  // 多值的设置与读取
  // client.hmset('mukey1', {
  //   name: 'mukey1',
  //   age: 17
  // }, redis.print);
  // client.hmset('mukey2', 'time', '2016', 'height', 1000);
  // client.hgetall('mukey1', redis.print);

  // 打包多个命令一起执行(事物)
  // client.sadd('package', 'package1');
  // client.sadd('package', 'package2');
  // client.sadd('package', 'package3');
  // client.multi()
  //   .sismember('package', 'package1')
  //   .smembers('package')
  //   .exec((err, replies) => {
  //     console.log(replies);
  //   });
});

export default client;
