import auth from '@config/auth';
import { AppError } from '@shared/errors/app.error';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

export const isAuthenticated = (
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Missing Token');
  }

  const [, token] = authHeader.split(' ');

  try {
    verify(token, auth.jwt.secret);

    return next();
  } catch (error: any) {
    throw new AppError('Invalid token was provided');
  }
};
