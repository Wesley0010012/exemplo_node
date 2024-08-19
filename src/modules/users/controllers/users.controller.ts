import { CreateUsersService } from '@modules/users/services/create-user.service';
import { ListUserService } from '@modules/users/services/list-user.service';
import { Request, Response } from 'express';

export class UsersController {
  async index(request: Request, response: Response): Promise<Response> {
    const listUsers = new ListUserService();

    const users = await listUsers.execute();

    return response.status(200).json(users);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = new CreateUsersService();

    const user = await createUser.execute({ name, email, password });

    return response.json(user).status(201);
  }
}
