// 返回信息给前端调用者
const responseUser = (res, result) => {
  if (result && result.status) {
    res.status(result.status).send({
      msg: result.msg
    });
  } else if (result && result.err) {
    res.status(500).send(result);
  } else {
    res.status(200).send(result);
  }
};

export default {
  responseUser
};
