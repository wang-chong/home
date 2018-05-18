module.exports = function (cookie) {
  // 判断是否存在tk，不存在tk验证失败
  if (cookie.tk) {
    return true
  }
  return false
}