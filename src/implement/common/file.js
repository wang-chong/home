// 移动文件需要使用fs模块
const fs = require('fs');
// 公共方法
const Hcore = require(_src + 'utils/Hcore.js');

const connection = require(_src + 'sql/connection')

// 处理文件上传
// 项目文件保存的文件夹地址，相对于app.js
const folderPath = '/public/files/';
// 文件保存的磁盘地址
const savePath = process.cwd () + folderPath;
const multer = require('multer');
const upload = multer({dest: savePath}).single('file');

// 将保存地址写入数据库
function saveToSql (url) {
  return new Promise(function (resolve, reject) {
    var sql = `INSERT INTO \`file\` (url) VALUES ("${url}")`
    connection.query(sql, function (error, results, fields) {
      if (error) {
        reject(error);
      }
      resolve(results.insertId)
    })
  })
}

// 文件写入磁盘
function saveToDisk (file) {
  return new Promise(function (resolve, reject) {
    // 指定文件上传后的目录 - 示例为"files"目录.
    var newName = Date.now();
    var filenames = file.originalname.split('.');
    var target_path = file.path + '.' + filenames[filenames.length - 1];
    // 给用户访问的文件地址
    var url =  _domain + folderPath + file.filename + '.' + filenames[filenames.length - 1];
    // 存储的状态
    var STATUS = {
      rename: false,
      sql: false
    };
    // 存储在数据库的文件id
    var fileId = null;
    // 修改上传的文件名，添加文件类型格式
    try {
      fs.rename(file.path, target_path, function(err) {
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
      .then(fileId => {
        if (STATUS.rename) {
          resolve({
            id: fileId,
            url
          });
        } else {
          fileId = fileId;
        }
      })
      .catch(err => reject(err));
    } catch (error) {
      reject(error); 
    }
  });
}

module.exports = {
  // 向前端暴露的接口地址
  upload (req, res) {
    upload(req, res, function (err) {
      // 获得文件的临时路径,没有特殊指定的话就是/tmp下
      var file = req.file;
      if (file) {
        saveToDisk(file)
        .then(obj => res.send(obj))
        .catch(e => {
          Hcore.sendError({
            res,
            msg: e
          });
        })
      } else {
        Hcore.sendError({
          res,
          msg: '请选择文件'
        });
      }
    });
  },
  download (req, res) {
    var id = req.params.id;
    var sql = `SELECT url FROM file WHERE id=${id}`;
    connection.query(sql, function (error, results, fields) {
      if (error) throw error;
      res.send(results[0] || {url: null});
    });
  }
}