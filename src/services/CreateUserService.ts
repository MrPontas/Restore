import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';
import AppError from '../errors/AppError';

interface Request {
  name: string;
  login: string;
  email?: string;
  password: string;
  administrator?: boolean;
}
class CreateUserService {
  public async execute({
    name,
    login,
    email,
    password,
    administrator = false,
  }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const checkIfLoginExists = await userRepository.findOne({
      where: { login },
    });
    if (checkIfLoginExists) {
      throw new AppError('Login already exists.');
    }
    if (email) {
      const checkIfEmailExists = await userRepository.findOne({
        where: { email },
      });
      if (checkIfEmailExists) {
        throw new AppError('Email address already exists.');
      }
    }
    const user = await userRepository.create({
      name,
      login,
      email,
      password,
      administrator,
    });

    await userRepository.save(user);
    return user;
  }
}
export default CreateUserService;
