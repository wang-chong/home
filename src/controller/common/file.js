import Hcore from './../../utils/Hcore';
import { fileUpload, getFileUrlById } from './../../implement/common/index';

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
  }
};
