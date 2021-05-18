import { Router } from 'express';
import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import User from '../models/User';
import nodemailer from 'nodemailer';
const recRouter = Router();
import template from '../services/EmailServices/emailTemplate';
import { sign, verify } from 'jsonwebtoken';
import config from '../configs/recover';
import { hash } from 'bcryptjs';
import UpdateUserService from '../services/userServices/UpdateUserService';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

recRouter.get('/', async (request, response) => {
  const { login } = request.query;
  const userRepository = getRepository(User);
  const query = userRepository.createQueryBuilder('users');
  if (login) {
    const userResponse = await query
      .select('users')
      .addSelect('users.email')
      .where(`users.login = '${login}'`)
      .getOne();
    if (!userResponse) {
      throw new AppError('User not found', 404);
    }
    if (!userResponse.email) {
      throw new AppError('User informed is not administrator.', 400);
    }
    return response.json(userResponse);
  }
  throw new AppError('User not informed.', 400);
});

recRouter.post('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const userRepository = getRepository(User);
    const query = userRepository.createQueryBuilder('users');
    if (id) {
      const userResponse = await query
        .select('users')
        .addSelect('users.email')
        .where(`users.id = '${id}'`)
        .getOne();
      if (!userResponse) {
        throw new AppError('User not found', 404);
      }
      //Geração do token para expirar o link
      const { expiresIn, secret } = config;
      const recoverToken = sign({}, secret, {
        subject: userResponse.id,
        expiresIn,
      });

      //Nodemailer
      const transporter = nodemailer.createTransport({
        host: 'mail.brechorestore.com.br',
        port: 465,
        auth: {
          user: 'noreply@brechorestore.com.br',
          pass: 'E1fc3b6@!',
        },
      });
      const info = await transporter.sendMail({
        from: '"Re-store" <noreply@brechorestore.com.br>',
        to: userResponse.email, // list of receivers
        subject: 'Redefinição de senha', // Subject line
        html: template(recoverToken), // html body
      });

      return response.json(info);
    }
  } catch (error) {
    throw new AppError(error, 500);
  }
});

recRouter.post('/access/:token', async (request, response) => {
  const { token } = request.params;

  if (!token) {
    throw new AppError('JWT token is missing!');
  }
  const { secret } = config;
  verify(token, secret, (err, decoded) => {
    if (err) {
      console.log(err);
      throw new AppError('Unauthorized', 401);
    }
    const { sub } = decoded as TokenPayload;
    return response.json(sub);
  });
});

recRouter.post('/setuser/:token', async (request, response) => {
  const { token } = request.params;
  const { password, id } = request.body;
  console.log(id, password);
  if (!token) {
    throw new AppError('JWT token is missing!');
  }
  const { secret } = config;
  verify(token, secret, (err, decoded) => {
    if (err) {
      console.log(err);
      throw new AppError('Unauthorized', 401);
    }
  });
  const updateUser = new UpdateUserService();
  const user = await updateUser.execute({
    id,
    password,
  });
  if (!user) {
    throw new AppError('User not found - recover route', 404);
  }

  return response.json();
});

export default recRouter;
