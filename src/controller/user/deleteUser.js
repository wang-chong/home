import Hcore from './../../utils/Hcore';
import { deleteUser } from './../../implement/user/index';

export default async function (req, res) {
  const result = await deleteUser(req);
  if (result && result.err) global.logger.error(result);
  Hcore.responseUser(res, result);
}
