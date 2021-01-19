import { getRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import Category from '../../models/Category';
import Mold from '../../models/Mold';
import Product, { Genre, Size, Status } from '../../models/Product';
import Provider from '../../models/Provider';
import { userAuthenticated } from '../../utils/userAuthenticated';

class UpdateProductService {
  public async execute(
    id: string,
    product: Product,
    user: string,
  ): Promise<Product | undefined> {
    const categoryRepository = getRepository(Category);
    const providerRepository = getRepository(Provider);
    const moldRepository = getRepository(Mold);
    const productRepository = getRepository(Product);

    const productOnDB = await productRepository.findOne(id);
    if (!productOnDB) throw new AppError('Product not found.', 404);

    let categoryObject = product.category;
    if (!product.category) categoryObject = productOnDB.category;

    let moldObject = product.mold;
    if (!product.mold) moldObject = productOnDB.mold;

    let providerObject = product.provider;
    if (!product.provider) providerObject = productOnDB.provider;

    if (!product.brand) product.brand = productOnDB.brand;
    if (!product.color) product.color = productOnDB.color;
    if (!product.genre) product.genre = productOnDB.genre;
    if (!product.mold) product.mold = productOnDB.mold;
    if (!product.name) product.name = productOnDB.name;
    if (!product.obs) product.obs = productOnDB.obs;
    if (!product.provider) product.provider = productOnDB.provider;
    if (!product.purchase_type)
      product.purchase_type = productOnDB.purchase_type;
    if (!product.purchase_value)
      product.purchase_value = productOnDB.purchase_value;
    if (!product.sale_value) product.sale_value = productOnDB.sale_value;
    if (!product.size) product.size = productOnDB.size;
    if (!product.status) product.status = productOnDB.status;
    if (!moldObject) moldObject = productOnDB.mold;
    if (!providerObject) providerObject = productOnDB.provider;

    const userObject = await userAuthenticated(user);

    if (!Object.values(Genre).includes(product.genre)) {
      throw new AppError("Invalid value for 'Genre'");
    }
    if (!Object.values(Size).includes(product.size)) {
      throw new AppError("Invalid value for 'Size'");
    }
    if (!Object.values(Status).includes(product.status)) {
      throw new AppError("Invalid value for 'Status'");
    }
    try {
      await productRepository.update(id, {
        name: product.name,
        genre: product.genre,
        color: product.color,
        size: product.size,
        status: product.status,
        obs: product.obs,
        sale_value: product.sale_value,
        purchase_value: product.purchase_value,
        purchase_type: product.purchase_type,
        brand: product.brand,
        category: categoryObject,
        mold: moldObject,
        provider: providerObject,
        user: userObject,
      });
      const productUpdated = await productRepository.findOne(id);
      return productUpdated;
    } catch (errSql) {
      throw new AppError(errSql.message);
    }
  }
}
export default UpdateProductService;
