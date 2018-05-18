const express = require('express')
const auth = require(_src + 'auth/')
const Hcore = require(_src + 'utils/Hcore')
const router = express.Router()

// 用户模块接口实现
const user = require('./../implement/user/')

router.all('*', function (req, res, next) {
  // 鉴权
  if (auth(req.cookies)) {
    next();
  } else {
    Hcore.sendError({
      msg: '没有tk或者tk过期',
      res: res
    })
  }
})

// 获取所有用户的信息
router.get('/allUser', user.allUser)

// 创建一个用户
router.post('/createUser', user.createUser)

// 删除一个指定的用户
router.get('/deleteUser', user.deleteUser)

// 删除最后一个用户
router.get('/deleteLastUser', user.deleteLastUser)

// 更新指定用户的信息
router.post('/updateUser', user.updateUser)

// 查询用户信息
router.get('/referUser', user.referUser)

module.exports = router
