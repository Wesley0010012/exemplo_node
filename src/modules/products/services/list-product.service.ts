import { getCustomRepository } from 'typeorm';
import { ProductsRepository } from '../typeorm/repositories/products.repository';
import { Product } from '../typeorm/entities/product.entity';

export class ListProductService {
  public async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductsRepository);

    return await productsRepository.find();
  }
}
