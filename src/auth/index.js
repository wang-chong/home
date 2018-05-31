// 核心方法
import Hcore from './../utils/Hcore';

// 接口访问权限管理
function requireAuth(req, res, next) {
  // 判断session是否过期
  if (req.session && req.session.userId) {
    next();
    return true;
  }
  Hcore.responseUser(res, {
    status: 401,
    msg: '登录信息已过期'
  });
  return false;
}
export default requireAuth;
