import express, { type Application, type Request, type Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { config } from './config/env.js';
import { requestLogger } from './middleware/requestLogger.js';
import { errorHandler } from './middleware/errorHandler.js';
import { apiLimiter } from './middleware/rateLimiter.js';
import { AppError } from './utils/errors.js';

export function createApp(): Application {
  const app: Application = express();

  // Trust proxy in production behind reverse proxies like Nginx/Cloudflare
  if (config.isProduction) {
    app.set('trust proxy', 1);
  }

  // Security headers
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
      contentSecurityPolicy: false,
    })
  );

  // CORS configuration
  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl)
        if (!origin) return callback(null, true);
        callback(null, true);
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );

  // Body parsers
  app.use(express.json({ limit: '2mb' }));
  app.use(express.urlencoded({ extended: true, limit: '2mb' }));

  // Request logger
  app.use(requestLogger);

  // Apply general API rate limiter
  app.use('/api', apiLimiter);

  // Health check endpoint
  app.get('/api/health', (req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      status: 'healthy',
      service: 'cinematch-api',
      version: '1.0.0',
      uptimeSeconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
      environment: config.env,
    });
  });

  // Base API index
  app.get('/api', (req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      name: 'CineMatch API',
      version: '1.0.0',
      tagline: 'What should I watch tonight?',
      endpoints: {
        health: '/api/health',
        auth: '/api/auth',
        movies: '/api/movies',
        recommendations: '/api/recommendations',
        ai: '/api/ai',
        rag: '/api/rag',
        groups: '/api/groups',
        watchlist: '/api/watchlist',
        history: '/api/history',
        reviews: '/api/reviews',
        analytics: '/api/analytics',
      },
    });
  });

  // 404 Handler for undefined routes
  app.use('*', (req: Request, res: Response, next) => {
    next(AppError.notFound(`Route not found: ${req.method} ${req.originalUrl}`));
  });

  // Centralized Error Handler
  app.use(errorHandler);

  return app;
}

export default createApp();
