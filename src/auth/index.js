export default function (cookie) {
  // 判断是否存在tk，不存在tk验证失败
  if (!(cookie && cookie.tk)) {
    return true;
  }
  return false;
}
