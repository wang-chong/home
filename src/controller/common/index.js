import file from './file';
import user from './user';

export default {
  login: user.login,
  register: user.register,
  fileUpload: file.upload,
  getFileUrlById: file.download
};
