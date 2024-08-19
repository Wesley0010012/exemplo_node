import { getCustomRepository } from 'typeorm';
import { ProductsRepository } from '../typeorm/repositories/products.repository';
import { AppError } from '@shared/errors/app.error';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

export class CreateProductService {
  public async execute({ name, price, quantity }: IRequest) {
    const productsRepository = getCustomRepository(ProductsRepository);

    const productExists = await productsRepository.findByName(name);

    if (productExists) {
      throw new AppError('There is already one product with this name');
    }

    const product = productsRepository.create({
      name,
      price,
      quantity
    });

    await productsRepository.save(product);
  }
}
