import { compare } from 'bcryptjs';
import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import { sign, verify } from 'jsonwebtoken';
import authConfig from '../configs/auth';

import User from '../models/User';

interface Request {
  login: string;
  password: string;
}
interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ login, password }: Request): Promise<Response> {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({
      where: { login },
    });
    if (!user) {
      throw new AppError('Incorrect user/password combination.');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect user/password combination.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign(
      {
        expiresIn: expiresIn,
        data: 'foobar',
      },
      secret,
    );
    console.log(token);
    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
