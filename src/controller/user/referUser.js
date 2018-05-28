import Hcore from './../../utils/Hcore';
import { referUser } from './../../implement/user/index';

export default async function (req, res) {
  const { userName } = req.query;
  const result = await referUser(userName);
  if (result && result.err) global.logger.error(result);
  Hcore.responseUser(res, result);
}
