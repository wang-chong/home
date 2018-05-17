// 加载全局配置
require('./config/')()

const express = require('express')
const app = express()

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
app.use(express.static('static'))

app.listen(6666, function () {
  console.log('app is listening on port 6666!')
})

app.use('/user', user)
