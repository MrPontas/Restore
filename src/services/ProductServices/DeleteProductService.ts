import { DeleteResult, getRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import Product from '../../models/Product';

class DeleteProductService {
  public async execute(id: string): Promise<DeleteResult> {
    const productRepository = getRepository(Product);
    const product = await productRepository.findOne(id);
    if (!product) throw new AppError('Product not found', 404);

    const providerDeleted = await productRepository.delete(id);
    return providerDeleted;
  }
}
export default DeleteProductService;
