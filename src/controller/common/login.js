import Hcore from './../../utils/Hcore';
import { login } from './../../implement/common/index';

async function userLogin(req, res) {
  const { userName, password } = req.body;
  const result = await login(userName, password);
  if (result && result.err) {
    global.logger.error(result);
  } else if (result.length === 0) {
    Hcore.responseUser(res, {
      err: true,
      msg: '用户名/密码错误'
    });
  } else {
    Hcore.responseUser(res, result[0]);
  }
}

export default userLogin;
