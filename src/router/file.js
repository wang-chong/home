const express = require('express');
const router = express.Router();

// common模块文件接口实现
const file = require('./../implement/common/file');

// 创建一个用户
router.post('/upload', file.upload)

module.exports = router
