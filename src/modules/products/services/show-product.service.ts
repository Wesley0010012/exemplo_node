import { getCustomRepository } from 'typeorm';
import { ProductsRepository } from '../typeorm/repositories/products.repository';
import { Product } from '../typeorm/entities/product.entity';
import { AppError } from '@shared/errors/app.error';

interface IRequest {
  id: string;
}

export class ShowProductService {
  public async execute({ id }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductsRepository);

    const result = await productsRepository.findOne({
      id
    });

    if (!result) {
      throw new AppError('Product not found');
    }

    return result;
  }
}
