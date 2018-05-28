// const sendError = (options) => {
//   if (options && options.res) {
//     options.res.status(500).send({
//       msg: options.msg
//     });
//   }
// };

const responseUser = (res, result) => {
  if (result && result.err) {
    res.status(500).send(result);
  } else {
    res.status(200).send(result);
  }
};

export default {
  responseUser
};
