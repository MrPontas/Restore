import { DeleteResult, getRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import Register, { Type } from '../../models/Register';

class DeleteRegisterService {
  public async execute(
    id: string,
    deleteOutput?: boolean,
  ): Promise<DeleteResult> {
    const registerRepository = getRepository(Register);
    const register = await registerRepository.findOne(id);
    if (!register) {
      throw new AppError('Register not found', 404);
    }
    if (register.type == Type.OUTPUT && !deleteOutput) {
      throw new AppError(`You can't delete an output register.`);
    }
    const registerDeleted = await registerRepository.delete(id);
    return registerDeleted;
  }
}

export default DeleteRegisterService;
