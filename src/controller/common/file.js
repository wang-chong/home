import fs from 'fs';
import Hcore from './../../utils/Hcore';
import { fileUpload, getFileUrlById, downloadFileZip } from './../../implement/common/index';

export default {
  // 向前端暴露的接口地址
  async upload(req, res) {
    const result = await fileUpload(req, res);
    if (result && result.err) global.logger.error(result);
    Hcore.responseUser(res, result);
  },
  async download(req, res) {
    const { id } = req.params;
    const result = await getFileUrlById(id);
    if (result && result.err) global.logger.error(result);
    Hcore.responseUser(res, result);
  },
  async downloadZip(req, res) {
    const files = [];
    files.push({
      name: '404.png',
      path: './static/404.png'
    });
    files.push({
      name: '405.png',
      path: './static/404.png'
    });
    const zipName = '压缩包.zip';
    const data = await downloadFileZip(files);
    fs.writeFile(zipName, data, 'utf8', () => {
      res.setHeader('Content-Type', 'application/vnd.openxmlformats');
      res.attachment(zipName);
      res.end(fs.readFileSync(zipName), 'utf8');
      fs.unlinkSync(zipName);
    });
  }
};
