// 移动文件需要使用fs模块
import fs from 'fs';
import multer from 'multer';
// 公共方法
import Hcore from './../../utils/Hcore';
// 连接数据库
import connection from './../../sql/connection';

// 处理文件上传
// 项目文件保存的文件夹地址，相对于app.js
const folderPath = '/public/files/';
// 文件保存的磁盘地址
const savePath = process.cwd() + folderPath;

const upload = multer({
  dest: savePath
}).single('file');

// 将保存地址写入数据库
function saveToSql(url) {
  return new Promise((resolve, reject) => {
    const stampId = `F${Date.now()}`;
    const fileId = `${stampId.substring(0, 3)}${stampId.substring(11)}`;
    const sql = `INSERT INTO file (id, url) VALUES ("${fileId},${url}")`;
    connection.query(sql, (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.insertId);
    });
  });
}

// 文件写入磁盘
function saveToDisk(file) {
  return new Promise((resolve, reject) => {
    // 指定文件上传后的目录 - 示例为"file"目录.
    const filenames = file.originalname.split('.');
    const targetPath = `${file.path}.${filenames[filenames.length - 1]}`;
    // 给用户访问的文件地址
    const url = `${global.domain}${folderPath}${file.filename}.${filenames[filenames.length - 1]}`;
    // 存储的状态
    const STATUS = {
      rename: false,
      sql: false
    };
    // 存储在数据库的文件id
    const fileId = null;
    // 修改上传的文件名，添加文件类型格式
    try {
      fs.rename(file.path, targetPath, (err) => {
        if (err) throw err;
        STATUS.rename = true;
        if (fileId) {
          resolve({
            url,
            id: fileId
          });
        }
      });
      saveToSql(url)
        .then((id) => {
          if (STATUS.rename) {
            resolve({
              id,
              url
            });
          } else {
            reject();
          }
        })
        .catch(err => reject(err));
    } catch (error) {
      reject(error);
    }
  });
}

export default {
  // 向前端暴露的接口地址
  upload(req, res) {
    upload(req, res, (err) => {
      if (err) {
        Hcore.sendError({
          res,
          msg: err
        });
        return;
      }
      // 获得文件的临时路径,没有特殊指定的话就是/tmp下
      const { file } = req;
      if (file) {
        saveToDisk(file)
          .then(obj => res.send(obj))
          .catch((e) => {
            Hcore.sendError({
              res,
              msg: e
            });
          });
      } else {
        Hcore.sendError({
          res,
          msg: '请选择文件'
        });
      }
    });
  },
  download(req, res) {
    const { id } = req.params;
    const sql = `SELECT url FROM file WHERE id=${id}`;
    connection.query(sql, (error, results) => {
      if (error) throw error;
      res.send(results[0] || {
        url: null
      });
    });
  }
};
