import { getCustomRepository } from 'typeorm';
import { AppError } from '@shared/errors/app.error';
import { UsersRepository } from '@modules/users/typeorm/repository/users.repository';
import { User } from '../typeorm/entities/user.entity';
import { hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import auth from '@config/auth';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

export class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findByEmail(email);
    const hashedPassword = await hash(password, 8);

    if (!user || user.password !== hashedPassword) {
      throw new AppError('Invalid login was provided');
    }

    const token = sign({}, auth.jwt.secret, {
      subject: user.id,
      expiresIn: auth.jwt.expiresIn
    });

    return {
      user,
      token
    };
  }
}
