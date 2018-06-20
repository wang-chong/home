import bunyan from 'bunyan';
import path from 'path';
import { domain } from './../../config/env';

const logger = bunyan.createLogger({
  name: 'node-home',
  serializers: {
    req: bunyan.stdSerializers.req,
    res: bunyan.stdSerializers.res,
    err: bunyan.stdSerializers.err
  },
  streams: [
    {
      // stream: process.stdout
      type: 'rotating-file',
      level: 'info',
      path: path.join(__dirname, './../../logs', 'info.js'),
      period: '1d', // daily rotation
      count: 7 // keep 7 back copies
    },
    {
      type: 'rotating-file',
      level: 'debug',
      path: path.join(__dirname, './../../logs', 'server.js'),
      period: '1d', // daily rotation
      count: 7 // keep 7 back copies
    },
    {
      type: 'rotating-file',
      level: 'error',
      path: path.join(__dirname, './../../logs', 'error.js'),
      period: '1d', // daily rotation
      count: 7 // keep 7 back copies
    }
  ]
});

// 全局变量，指向src目录
global.src = path.join(__dirname, '../../', 'src');
global.public = path.join(__dirname, '../../', 'public');
global.domain = domain;
global.logger = logger;
