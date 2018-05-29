import file from './file';
import userLogin from './login';

export default {
  login: userLogin,
  fileUpload: file.upload,
  getFileUrlById: file.download
};
