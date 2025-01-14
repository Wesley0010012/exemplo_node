import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  public async findByName(name: string): Promise<User | undefined> {
    return await this.findOne({
      where: {
        name
      }
    });
  }

  public async findById(id: string): Promise<User | undefined> {
    return await this.findOne({
      where: {
        id
      }
    });
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return await this.findOne({
      where: {
        email
      }
    });
  }
}
