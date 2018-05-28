import Hcore from './../../utils/Hcore';
import { createUser } from './../../implement/user/index';

export default async function (req, res) {
  const { userName } = req.body;
  const result = await createUser(userName);
  if (result && result.err) global.logger.error(result);
  Hcore.responseUser(res, result);
}
