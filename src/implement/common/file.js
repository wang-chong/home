// 移动文件需要使用fs模块
const fs = require('fs');
// 公共方法
const Hcore = require(_src + 'utils/Hcore.js');

// 处理文件上传
// 项目文件保存的文件夹地址，相对于app.js
const folderPath = '/public/files/';
// 文件保存的磁盘地址
const savePath = process.cwd () + folderPath;
const multer = require('multer');
const upload = multer({dest: savePath}).single('file');

// 文件写入磁盘
function saveToDisk (file) {
  return new Promise(function (resolve, reject) {
    // 指定文件上传后的目录 - 示例为"files"目录.
    var newName = Date.now();
    var filenames = file.originalname.split('.');
    var target_path = file.path + '.' + filenames[filenames.length - 1];
    // 修改上传的文件名，添加文件类型格式
    try {
      fs.rename(file.path, target_path, function(err) {
        if (err) throw err;
        resolve(_domain + folderPath + file.filename + '.' + filenames[filenames.length - 1]);
      });
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
        .then(url => {
          res.send({ url })
        })
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
  }
}