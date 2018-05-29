import express from 'express';
// common模块接口实现
import common from './../controller/common/';

const router = express.Router();

// 用户登录
router.post('/user/login', common.login);
// 用户注册
router.post('/user/register', common.register);

// 上传单个文件
router.post('/file/upload', common.fileUpload);

// 根据上传文件时的id去查询文件信息
router.get('/file/download/:id', common.getFileUrlById);

export default router;
