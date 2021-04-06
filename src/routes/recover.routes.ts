import { Router } from 'express';
import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import User from '../models/User';
import nodemailer from 'nodemailer';
const recRouter = Router();
import html from '../services/EmailServices/emailTemplate';

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

      const transporter = nodemailer.createTransport({
        host: 'corfu.kidc.com.br',
        port: 465,
        auth: {
          user: 'noreply@brechorestore.com.br',
          pass: 'E1fc3b6@!',
        },
      });
      let info = await transporter.sendMail({
        from: 'Re-store<noreply@brechorestore.com.br>',
        to: userResponse.email, // list of receivers
        subject: 'Redefinição de senha', // Subject line
        html, // html body
      });

      return response.json({ message: 'successs' });
    }
  } catch (error) {
    throw new AppError(error);
  }
});

export default recRouter;
