import Hcore from './../../utils/Hcore';
import { allUser } from './../../implement/user/index';

export default async function (req, res) {
  const result = await allUser();
  if (result && result.err) global.logger.error(result);
  Hcore.responseUser(res, result);
}
