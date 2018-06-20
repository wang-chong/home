// 移动文件需要使用fs模块
import fs from 'fs';
import multer from 'multer';
// 多个文件打包成zip文件
import JSZip from 'jszip';
// 连接数据库
import connection from './../../sql/connection';

// 处理文件上传
// 项目文件保存的文件夹地址，相对于app.js
const folderPath = '/files/';
// 文件保存的磁盘地址
const savePath = global.public + folderPath;
const upload = multer({
  dest: savePath
}).single('file');

// 将保存地址写入数据库
function saveToSql(url) {
  return new Promise((resolve) => {
    const stampId = `F${Date.now()}${Math.floor(Math.random() * 10)}`;
    const fileId = `${stampId.substring(0, 2)}${stampId.substring(10)}`;
    const sql = `INSERT INTO file (id, url) VALUES ("${fileId}","${url}")`;
    connection.query(sql, (error) => {
      if (error) {
        resolve({
          err: true,
          msg: error
        });
      }
      resolve(fileId);
    });
  });
}

// 文件写入磁盘
async function saveToDisk(file) {
  return new Promise(async (resolve) => {
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
    // 文件ID
    let fileId = null;
    // 修改上传的文件名，添加文件类型格式
    try {
      fs.rename(file.path, targetPath, (err) => {
        if (err) throw err;
        if (STATUS.rename) {
          resolve(fileId);
        } else {
          STATUS.rename = true;
        }
      });
      const result = await saveToSql(url);
      if (result && result.err) {
        resolve(result);
      }
      fileId = result;
      if (STATUS.rename) {
        resolve(result);
      } else {
        STATUS.sql = true;
      }
    } catch (error) {
      resolve({
        err: true,
        msg: error
      });
    }
  });
}

export default {
  fileUpload(req, res) {
    return new Promise((resolve) => {
      try {
        upload(req, res, async (err) => {
          if (err) throw err;
          // 获得文件的临时路径,没有特殊指定的话就是/tmp下
          const { file } = req;
          if (file) {
            const result = await saveToDisk(file);
            resolve(result);
          } else {
            throw new Error('请选择文件');
          }
        });
      } catch (e) {
        resolve({
          err: true,
          msg: e
        });
      }
    });
  },
  getFileUrlById(id) {
    return new Promise((resolve) => {
      const sql = `SELECT url FROM file WHERE id="${id}"`;
      connection.query(sql, (error, results) => {
        if (error) {
          resolve({
            err: true,
            msg: error
          });
        }
        resolve(results[0] || { url: null });
      });
    });
  },
  downloadFileZip(files) {
    if (!Array.isArray(files)) {
      return '参数必须为数组';
    }
    const zip = new JSZip();
    files.map(file => zip.file(file.name, fs.readFileSync(file.path)));
    return zip.generateAsync({
      type: 'nodebuffer'
    });
  }
};
