import { compare } from 'bcryptjs';
import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import { sign } from 'jsonwebtoken';
import authConfig from '../configs/auth';

import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<void> {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({
      where: { email },
    });
    if (!user) {
      throw new AppError('Incorrect user/password combination.');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect user/password combination.', 401);
    }
!!!!!!!!!!!PAREI AQUI
    // const { secret, expiresIn } = authConfig.jwt;

    // const token = sign({user.id}, secret, {
    //   expiresIn,
    // });
  }
}

export default AuthenticateUserService;
