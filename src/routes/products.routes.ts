import { Router } from 'express';
import { getRepository, Raw, UpdateDateColumn } from 'typeorm';
import AppError from '../errors/AppError';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ensureNotEmpty from '../middlewares/ensureNotEmpty';

import Category from '../models/Category';
import Mold from '../models/Mold';
import Product, { Genre, Size, Status } from '../models/Product';
import Provider from '../models/Provider';
import User from '../models/User';
import CreateProductService from '../services/ProductServices/CreateProductService';
import UpdateProductService from '../services/ProductServices/UpdateProductService';

const productsRouter = Router();
productsRouter.use(ensureAuthenticated);
productsRouter.use(ensureNotEmpty);

productsRouter.post('/', async (request, response) => {
  const product: Product = request.body;
  const user = request.userId;
  const createProductService = new CreateProductService();
  const productCreated = await createProductService.execute(product, user);

  return response.json(productCreated);
});
productsRouter.get('/', async (request, response) => {
  const { name } = request.query;
  const productRepository = getRepository(Product);
  console.log(name);
  if (name) {
    const products = await productRepository.find({
      where: { name: Raw(alias => `${alias} LIKE '%${name}%'`) },
    });
    return response.json(products);
  }
  const products = await productRepository.find();
  return response.json(products);
});

productsRouter.get('/:id', async (request, response) => {
  const { id } = request.params;
  const productRepository = getRepository(Product);
  const product = await productRepository.findOneOrFail({
    where: { id },
  });
  return response.json(product);
});

productsRouter.put('/:id', async (request, response) => {
  const product: Product = request.body;
  const { id } = request.params;

  const user = request.userId;
  const updateProductService = new UpdateProductService();
  const productUpdated = await updateProductService.execute(id, product, user);
  return response.json(productUpdated);
});
productsRouter.delete('/:id', async (request, response) => {});

export default productsRouter;
