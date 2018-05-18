// 加载全局配置
require('./config/')()

const express = require('express')
const app = express()
// 转换请求带来的cookie为对象
const cookieParser = require('cookie-parser')

// 解析请求数据
const bodyParser = require('body-parser')

// user模块
const user = require('./src/router/user.js')

// 解析post请求的数据
const multer = require('multer')
// for parsing multipart/form-data
const upload = multer()
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// for parsing application/json
app.use(bodyParser.json())

// 设置静态文件的访问路径
// public映射到static目录
// 访问路径localhost:3000/public/404.png
app.use('/public', express.static('static'))
// 以下不做映射，访问地址为localhost:3000/404.png
// app.use(express.static('static'))

// 转换请求带来的cookie为对象
app.use(cookieParser())

app.listen(3000, function () {
  console.log('app is listening on port 3000!')
})

app.use('/user', user)


// 测试服务是否正常启动
// const router = express.Router()
// const connection = require(_src + 'sql/connection')
// router.get('/allUser', function (req, res) {
//   var sql = 'SELECT `name` AS userName,`user_id` AS userId FROM `user` where `delete`=0'
//   connection.query(sql, function (error, results, fields) {
//     if (error) throw error
//     res.send(results)
//   })
// })
// app.use('/user', router)
