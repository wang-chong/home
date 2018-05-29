import redis from 'redis';

const client = redis.createClient();
client.on('error', (err) => {
  global.logger(err);
});

export default client;
