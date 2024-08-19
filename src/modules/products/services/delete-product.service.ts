import { getCustomRepository } from 'typeorm';
import { ProductsRepository } from '../typeorm/repositories/products.repository';
import { AppError } from '@shared/errors/app.error';

interface IRequest {
  id: string;
}

export class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const productsRepository = getCustomRepository(ProductsRepository);

    const result = await productsRepository.findOne({
      id
    });

    if (!result) {
      throw new AppError('Product not found');
    }

    await productsRepository.delete(result);
  }
}
