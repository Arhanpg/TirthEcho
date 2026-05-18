import { Request, Response, NextFunction } from 'express';
import { Logger } from '../utils/logger';

const logger = new Logger('error-handler');

export function errorHandler(err: any, req: Request, res: Response, _next: NextFunction): void {
  logger.error('Error:', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  const statusCode = err.statusCode || err.status || 500;
  const code = err.code || 'INTERNAL_SERVER_ERROR';
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    error: {
      code,
      message,
      details: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    },
  });
}

export class AppError extends Error {
  constructor(public statusCode: number, public code: string, message: string) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }
}
