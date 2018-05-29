import express from 'express';
// 鉴权
import auth from './../auth/';
// 核心方法
import Hcore from './../utils/Hcore';
// 用户模块接口实现
import user from './../controller/user/index';

const router = express.Router();

router.all('*', (req, res, next) => {
  // 鉴权
  if (auth(req)) {
    next();
  } else {
    Hcore.responseUser(res, {
      res,
      msg: '登录信息已过期'
    });
  }
});

// 获取所有用户的信息
router.get('/allUser', user.allUser);

// 删除一个指定的用户
router.get('/deleteUser', user.deleteUser);

// 删除最后一个用户
router.get('/deleteLastUser', user.deleteLastUser);

// 更新指定用户的信息
router.post('/updateUser', user.updateUser);

// 查询用户信息
router.get('/referUser', user.referUser);

export default router;
