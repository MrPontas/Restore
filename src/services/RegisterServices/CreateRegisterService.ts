import { getConnection, getRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import Product, { Status } from '../../models/Product';
import Register, { Type } from '../../models/Register';
import { userAuthenticated } from '../../utils/userAuthenticated';
import CreateProductService from '../../services/ProductServices/CreateProductService';
import UpdateProductService from '../ProductServices/UpdateProductService';
import DeleteRegisterService from './DeleteRegisterService';

interface Request {
  type: Type;
  products: Product[];
  reason: string;
  user: string;
}

class CreateRegisterService {
  public async execute({
    type,
    products,
    reason,
    user,
  }: Request): Promise<Register | undefined> {
    const registersRepository = getRepository(Register);
    const productRepository = getRepository(Product);
    const userAuth = await userAuthenticated(user);

    if (!Object.values(Type).includes(type)) {
      throw new AppError("Invalid value for 'Type'");
    }
    const register = registersRepository.create({
      type,
      reason,
      user: userAuth,
    });
    await registersRepository.save(register);
    //registro de entrada
    if (type == Type.INPUT) {
      if (reason) {
        throw new AppError(
          'The reason of register must be defined only on an output register.',
        );
      }

      await Promise.all(
        products.map(async product => {
          try {
            if (!product) {
              throw new AppError(`Something went wrong on 'products'`);
            }
            const productObject = await productRepository.findOne({
              where: [{ name: product.name }],
            });
            if (productObject) {
              throw new AppError(
                `The product '${product.name}' is already registered.`,
              );
            }

            const createProductService = new CreateProductService();
            product = await createProductService.execute(product, user);
            await registersRepository
              .createQueryBuilder()
              .relation(Register, 'products')
              .of(register)
              .add(product);
          } catch (err) {
            const deleteRegisterService = new DeleteRegisterService();
            await deleteRegisterService.execute(register.id);
            throw new AppError(err.message, err.statusCode);
          }
        }),
      );
    }
    //registro de saida
    if (type == Type.OUTPUT) {
      await Promise.all(
        products.map(async product => {
          try {
            const productObject = await productRepository.findOne(product.id);
            if (!productObject) {
              throw new AppError(`Something went wrong on 'products'`);
            }
            if (productObject.status != Status.IN_STOCK) {
              throw new AppError('Invalid product status.');
            }
            productObject.status = Status.OUTPUT;

            const updateProductService = new UpdateProductService();
            await updateProductService.execute(
              productObject.id,
              productObject,
              user,
            );

            await registersRepository
              .createQueryBuilder()
              .relation(Register, 'products')
              .of(register)
              .add(productObject);
          } catch (err) {
            const deleteRegisterService = new DeleteRegisterService();
            await deleteRegisterService.execute(register.id, true);
            throw new AppError(err.message, err.statusCode);
          }
        }),
      );
    }
    const registerCreated = await registersRepository.findOne(register.id);
    return registerCreated;
  }
}

export default CreateRegisterService;
