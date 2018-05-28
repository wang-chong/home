import Hcore from './../../utils/Hcore';
import { updateUser } from './../../implement/user/index';

export default async function (req, res) {
  const { userName } = req.body;
  const result = await updateUser(userName);
  if (result && result.err) global.logger.error(result);
  Hcore.responseUser(res, result);
}
