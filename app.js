const app = require('express')()
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

app.listen(6666, function () {
  console.log('Example app listening on port 6666!')
})

app.use('/user', user)
