const express = require('express')
const router = express.Router()

// 用户模块接口实现
const user = require('./../implement/user/')

router.all('*', function (req, res, next) {
  //
  // if (!tk) {
    // 鉴权失败, 返回
  // } else {
    next()
  // }
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
