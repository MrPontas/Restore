import { getRepository, UpdateResult } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../../models/User';
import AppError from '../../errors/AppError';

interface Request {
  id: string;
  name?: string;
  login?: string;
  email?: string;
  password?: string;
  administrator?: boolean;
}
class UpdateUserService {
  public async execute({
    id,
    name,
    login,
    email,
    password,
    administrator,
  }: Request): Promise<User | undefined> {
    const userRepository = getRepository(User);

    const user = await userRepository
      .createQueryBuilder('users')
      .select(`users`)
      .addSelect('users.password')
      .where(`id = :id`, { id: id })
      .getOne();

    if (!user) {
      throw new AppError('User not found - update user service', 404);
    }
    if (!name) name = user.name;
    if (!login) login = user.login;
    if (!email) email = user.email;
    if (administrator === undefined) {
      administrator = user.administrator;
    }

    //After this if the password is cryptographed
    if (!password) {
      password = user.password;
    } else {
      password = await hash(password, 8);
    }

    try {
      await userRepository.update(id, {
        name,
        login,
        email,
        password,
        administrator,
      });
      const userUpdated = await userRepository.findOne({
        where: { id },
      });
      return userUpdated;
    } catch (sqlErr) {
      console.log(sqlErr);
      throw new AppError(sqlErr.sqlMessage);
    }
    return undefined;
  }
}
export default UpdateUserService;
