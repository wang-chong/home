// 接口的具体实现
const createUser = require('./createUser')
const allUser = require('./allUser')
const deleteUser = require('./deleteUser')
const deleteLastUser = require('./deleteLastUser')
const updateUser = require('./updateUser')
const referUser = require('./referUser')

module.exports = {
  createUser,
  allUser,
  deleteUser,
  deleteLastUser,
  updateUser,
  referUser
}