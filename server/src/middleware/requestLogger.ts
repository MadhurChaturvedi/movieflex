import type { Request, Response, NextFunction } from 'express';
import { Logger } from '../utils/logger.js';

export function requestLogger(req: Request, res: Response, next: NextFunction): void {
  const start = Date.now();
  const { method, originalUrl } = req;

  res.on('finish', () => {
    const duration = Date.now() - start;
    const { statusCode } = res;
    
    // Only log API routes to keep console readable
    if (originalUrl.startsWith('/api')) {
      const level = statusCode >= 500 ? 'error' : statusCode >= 400 ? 'warn' : 'info';
      if (level === 'error') {
        Logger.error('HTTP', `${method} ${originalUrl} ${statusCode} - ${duration}ms`);
      } else if (level === 'warn') {
        Logger.warn('HTTP', `${method} ${originalUrl} ${statusCode} - ${duration}ms`);
      } else {
        Logger.debug('HTTP', `${method} ${originalUrl} ${statusCode} - ${duration}ms`);
      }
    }
  });

  next();
}
