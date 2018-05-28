import Hcore from './../../utils/Hcore';
import { deleteLastUser } from './../../implement/user/index';

export default async function (req, res) {
  const result = await deleteLastUser();
  if (result && result.err) global.logger.error(result);
  Hcore.responseUser(res, result);
}
