module.exports = {
  sendError (options) {
    if (options && options.res) {
      options.res.status(500).send({
        msg: options.msg
      })
    }
  }
}