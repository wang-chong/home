export default function (req) {
  // 判断session是否过期
  if (req.session && req.session.userId) {
    return true;
  }
  return false;
}
