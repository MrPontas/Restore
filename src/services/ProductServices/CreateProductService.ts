import { getRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import Category from '../../models/Category';
import Mold from '../../models/Mold';
import Product, { Genre, Size, Status } from '../../models/Product';
import Provider from '../../models/Provider';
import { userAuthenticated } from '../../utils/userAuthenticated';
// import { ProductProps } from '../../routes/products.routes';

class CreateProductService {
  public async execute(product: Product, user: string): Promise<Product> {
    const categoryRepository = getRepository(Category);
    const moldRepository = getRepository(Mold);
    const providerRepository = getRepository(Provider);
    const productRepository = getRepository(Product);
    try {
      const checkIfProductExists = await productRepository.findOne({
        where: { name: product.name },
      });
      if (checkIfProductExists) {
        throw new AppError('The product already exists.');
      }

      const categoryObject = await categoryRepository.findOne({
        where: { id: product.category },
      });
      if (!categoryObject || !product.category)
        throw new AppError('Category not found.', 404);

      const providerObject = await providerRepository.findOne(product.provider);
      if (!providerObject || !product.provider)
        throw new AppError('Provider not found.', 404);

      const moldObject = await moldRepository.findOne(product.mold);
      if (!moldObject || !product.mold)
        throw new AppError('Model not found.', 404);
      const userObject = await userAuthenticated(user);

      if (!Object.values(Genre).includes(product.genre)) {
        throw new AppError("Invalid value for 'Genre'");
      }
      if (!Object.values(Size).includes(product.size)) {
        throw new AppError("Invalid value for 'Size'");
      }

      product.status = Status.IN_STOCK;

      const productCreated = productRepository.create({
        name: product.name,
        mold: moldObject,
        genre: product.genre,
        color: product.color,
        size: product.size,
        status: product.status,
        obs: product.obs,
        measure: product.measure,
        sale_value: product.sale_value,
        purchase_value: product.purchase_value,
        purchase_type: product.purchase_type,
        brand: product.brand,
        provider: providerObject,
        category: categoryObject,
        user: userObject,
      });
      await productRepository.save(productCreated);
      return productCreated;
    } catch (err) {
      throw new AppError(err);
    }
  }
}
export default CreateProductService;
