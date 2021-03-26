import { Router } from 'express';
import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import User from '../models/User';
import nodemailer from 'nodemailer';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
const recRouter = Router();

recRouter.get('/', async (request, response) => {
  const { login } = request.query;
  const userRepository = getRepository(User);
  const query = userRepository.createQueryBuilder('users');
  if (login) {
    const userResponse = await query
      .select('users.administrator')
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

export default recRouter;

recRouter.post('/', ensureAuthenticated, async (request, response) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'ora.luettgen26@ethereal.email',
        pass: '84qahBArQXcbxhbrGT',
      },
    });
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: 'Ora Luettgen <ora.luettgen26@ethereal.email>',
      to: 'guipontarolo@gmail.com', // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello world?', // plain text body
      html: '<b>Hello world?</b>', // html body
    });
    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    return response.json({ ok: true });
  } catch (error) {
    throw new AppError(error);
  }
});
