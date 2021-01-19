import { getRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import Product, { Status } from '../../models/Product';
import Register, { Type } from '../../models/Register';
import { userAuthenticated } from '../../utils/userAuthenticated';
import CreateProductService from '../../services/ProductServices/CreateProductService';

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
  }: Request): Promise<Register> {
    const registersRepository = getRepository(Register);
    const productRepository = getRepository(Product);
    const userAuth = await userAuthenticated(user);

    if (!Object.values(Type).includes(type)) {
      throw new AppError("Invalid value for 'Type'");
    }

    //registro de entrada
    const createProductService = new CreateProductService();
    let i = 0;
    if (type == Type.INPUT) {
      if (reason) {
        throw new AppError(
          'The reason of register must be defined only on an output register.',
        );
      }
      for (let product of products) {
        if (!product) {
          products.splice(i, 1);
        }
        const productObject = await productRepository.findOne({
          where: [{ id: product.id }, { name: product.name }],
        });
        if (productObject) {
          // const productObject = await createProductService.execute(product, user);
          throw new AppError(
            `The product '${product.name}' is already registered.`,
          );
        }
        product = await createProductService.execute(product, user);
        i++;
      }
    }
    i = 0;
    //registro de saida
    if (type == Type.OUTPUT) {
      for (let product of products) {
        if (!product) {
          products.splice(i, 1);
        }
        if (product.status != Status.IN_STOCK) {
          throw new AppError(
            `The product '${product.name}' is not assignable to an output register.`,
          );
        }
        product.status = Status.OUTPUT;
        i++;
      }
    }
    if (!products || !products.length) {
      throw new AppError('It must have at least one product');
    }
    const registerCreated = registersRepository.create({
      type,
      products,
      reason,
      user: userAuth,
    });
    registersRepository.save(registerCreated);
    return registerCreated;
  }
}

export default CreateRegisterService;
