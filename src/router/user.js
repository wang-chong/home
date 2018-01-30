const express = require('express')
const router = express.Router()
//接口实现部分
const createUser = require('./../implement/createUser')
const allUser = require('./../implement/allUser')
const deleteUser = require('./../implement/deleteUser')
const deleteLastUser = require('./../implement/deleteLastUser')
const updateUser = require('./../implement/updateUser')
const referUser = require('./../implement/referUser')

router.all('*', function (req, res, next) {
  //
  // if (!tk) {
    // 鉴权失败, 返回
  // } else {
    next()
  // }
})

// 获取所有用户的信息
router.get('/allUser', allUser)

// 创建一个用户
router.post('/createUser', createUser)

// 删除一个指定的用户
router.get('/deleteUser', deleteUser)

// 删除最后一个用户
router.get('/deleteLastUser', deleteLastUser)

// 更新指定用户的信息
router.post('/updateUser', updateUser)

// 查询用户信息
router.get('/referUser', referUser)

module.exports = router
