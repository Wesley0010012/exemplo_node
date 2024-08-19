import { EntityRepository, Repository } from 'typeorm';
import { Product } from '../entities/product.entity';

@EntityRepository()
export class ProductsRepository extends Repository<Product> {
  public async findByName(name: string): Promise<Product | undefined> {
    return this.findOne({
      where: {
        name
      }
    });
  }
}
