import express from 'express';

const router = express.Router();

router.use((req, res, next) => {
  console.log(`Time is ${Date.now()}`);
  next();
});

router.get('/', (req, res) => {
  console.log('1111');
  res.send({
    a: '1111'
  });
});

router.get('/test', (req, res) => {
  console.log('test');
  res.send('test');
});

export default router;
