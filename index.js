import 'babel-polyfill';
// 解析请求数据
import bodyParser from 'body-parser';
// 转换请求带来的cookie为对象
import cookieParser from 'cookie-parser';
import express from 'express';
// 各个模块加载
// user模块
import user from './src/router/user';
// common模块
import common from './src/router/common';
// 加载全局配置
import './src/global/';

const app = express();
// 解析post请求的数据
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// for parsing application/json
app.use(bodyParser.json());

// 转换请求带来的cookie为对象
app.use(cookieParser());

// 设置静态文件的访问路径
// static映射到static目录,如果不做映射，那么访问的地址中将不再需要static这个路径
// 访问路径localhost:3000/static/404.png
app.use('/static', express.static('static'));
app.use('/public', express.static('public'));

app.listen(3000, () => {
  console.log('NodeApp is listening on port 3000!');
});

app.use('/api/user', user);
app.use('/api/common', common);
