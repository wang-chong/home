import Hcore from './../../utils/Hcore';
import { deleteUser } from './../../implement/user/index';

export default async function (req, res) {
  const { userName } = req.body;
  const result = await deleteUser(userName);
  if (result && result.err) global.logger.error(result);
  Hcore.responseUser(res, result);
}
