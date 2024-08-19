import { AppError } from '@shared/errors/app.error';
import { Request, Response, NextFunction } from 'express';

export const errorHandlerMiddleware = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
};
