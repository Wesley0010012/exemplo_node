import { getCustomRepository } from 'typeorm';
import { User } from '../typeorm/entities/user.entity';
import { UsersRepository } from '../typeorm/repository/users.repository';

export class ListUserService {
  public async execute(): Promise<User[]> {
    const usersRepository = getCustomRepository(UsersRepository);

    return await usersRepository.find();
  }
}
