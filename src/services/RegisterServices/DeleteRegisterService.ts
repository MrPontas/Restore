import { DeleteResult, getRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import Product, { Status } from '../../models/Product';
import Register, { Type } from '../../models/Register';
import UpdateProductService from '../ProductServices/UpdateProductService';

class DeleteRegisterService {
  public async execute(id: string, user: string): Promise<DeleteResult> {
    const registerRepository = getRepository(Register);
    const productRepository = getRepository(Product);
    const register = await registerRepository.findOne(id);

    if (!register) {
      throw new AppError('Register not found', 404);
    }
    if (register.type == Type.OUTPUT) {
      const updateProductService = new UpdateProductService();
      await Promise.all(
        register.products.map(async product => {
          product.status = Status.IN_STOCK;
          await updateProductService.execute(product.id, product, user);
        }),
      );
    }
    if (register.type == Type.INPUT) {

      for(let i = 0; i < register.products.length; i++){
        if(register.products[i].status == Status.OUTPUT){
          throw new AppError('There is at least one product in an output register', 400);
        }
      }

      await Promise.all(
        register.products.map(async product => {
          await registerRepository
            .createQueryBuilder()
            .relation(Register, 'products')
            .of(register)
            .remove(product);
          await productRepository.delete(product.id);
        }),
      );
    }
    const registerDeleted = await registerRepository.delete(id);
    return registerDeleted;
  }
}

export default DeleteRegisterService;
