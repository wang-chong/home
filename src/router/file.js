const express = require('express');
const router = express.Router();

// common模块文件接口实现
const file = require('./../implement/common/file');

// 上传单个文件
router.post('/upload', file.upload)

// 根据上传文件时的id去查询文件信息
router.get('/download/*', file.download)

module.exports = router
