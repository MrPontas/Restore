import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import User from '../models/User';
import UserHiddenInformation from './userHidenInformation';

export async function userAuthenticated(
  id: string,
): Promise<UserHiddenInformation> {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne(id);
  if (!user) throw new AppError("Cant't find user authentication.");
  const userHidden: UserHiddenInformation = user;
  delete userHidden.email;
  delete userHidden.login;
  delete userHidden.password;

  return userHidden;
}
