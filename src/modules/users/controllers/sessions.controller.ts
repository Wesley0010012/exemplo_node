import { Request, Response } from 'express';
import { CreateSessionsService } from '../services/create-sessions.service';

export class SessionsController {
  async create(request: Request, response: Response): Promise<Response> {
    const sessionsService = new CreateSessionsService();

    const { email, password } = request.body;

    const result = await sessionsService.execute({ email, password });

    return response.json(result);
  }
}
