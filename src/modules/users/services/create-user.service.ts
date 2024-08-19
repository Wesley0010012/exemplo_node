import { getCustomRepository } from 'typeorm';
import { AppError } from '@shared/errors/app.error';
import { UsersRepository } from '@modules/users/typeorm/repository/users.repository';
import { User } from '../typeorm/entities/user.entity';
import { hash } from 'bcryptjs';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

export class CreateUsersService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const userExists = await usersRepository.findByEmail(email);

    if (userExists) {
      throw new AppError('There is already one user with this email');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword
    });

    await usersRepository.save(user);

    return user;
  }
}
