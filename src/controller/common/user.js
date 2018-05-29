import Hcore from './../../utils/Hcore';
import { userLogin, userRegister } from './../../implement/common/index';

export default {
  // 向前端暴露的接口地址
  async login(req, res) {
    const { userName, password } = req.body;
    const result = await userLogin(userName, password);
    if (result && result.err) {
      global.logger.error(result);
    } else if (result.length === 0) {
      Hcore.responseUser(res, {
        err: true,
        msg: '用户名/密码错误'
      });
    } else {
      req.session.userId = result[0].userId;
      Hcore.responseUser(res, result[0]);
    }
  },
  async register(req, res) {
    const { userName, password } = req.body;
    const result = await userRegister(userName, password);
    if (result && result.err) global.logger.error(result);
    Hcore.responseUser(res, result);
  }
};
