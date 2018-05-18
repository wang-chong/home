// 加载全局配置
require('./config/')()

const express = require('express')
const app = express()
// 转换请求带来的cookie为对象
const cookieParser = require('cookie-parser');

// 解析请求数据
const bodyParser = require('body-parser');
// 解析post请求的数据
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// for parsing application/json
app.use(bodyParser.json())

// 设置静态文件的访问路径
// static映射到static目录,如果不做映射，那么访问的地址中将不再需要static这个路径
// 访问路径localhost:3000/static/404.png
app.use('/static', express.static('static'));
app.use('/public', express.static('public'));

// 转换请求带来的cookie为对象
app.use(cookieParser())

// 各个模块加载
// user模块
const user = require('./src/router/user');
// common模块
const file = require('./src/router/file');

app.listen(3000, function () {
  console.log('NodeApp is listening on port 3000!')
})

app.use('/api/user', user);
app.use('/api/file', file);


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
