import express from 'express';

// common模块文件接口实现
import common from './../implement/common/';

const router = express.Router();

// 上传单个文件
router.post('/file/upload', common.fileUpload);

// 根据上传文件时的id去查询文件信息
router.get('/file/download/:id', common.fileDownload);

export default router;
