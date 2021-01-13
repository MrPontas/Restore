import { DeleteResult, getRepository } from 'typeorm';
import { Request } from 'express';
import User from '../../models/User';
import AppError from '../../errors/AppError';

class DeleteUserService {
  public async execute(id: string, request: Request): Promise<DeleteResult> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new AppError('User not found', 404);
    }
    if (user.id == request.userId) {
      throw new AppError('You cant delete your own user.');
    }

    const userDeleted = await userRepository.delete(id);
    return userDeleted;
  }
}
export default DeleteUserService;
