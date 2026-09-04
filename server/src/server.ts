import { createApp } from './app.js';
import { config } from './config/env.js';
import { Logger } from './utils/logger.js';

const app = createApp();

const server = app.listen(config.port, () => {
  Logger.info('Server', `🚀 CineMatch API Server running on port ${config.port} [${config.env}]`);
  Logger.info('Server', `Health check available at http://localhost:${config.port}/api/health`);
});

// Graceful shutdown
const shutdown = (signal: string) => {
  Logger.warn('Server', `Received ${signal}, initiating graceful shutdown...`);
  server.close(() => {
    Logger.info('Server', 'HTTP server closed. Exiting process.');
    process.exit(0);
  });

  // Force close after 10s if hung
  setTimeout(() => {
    Logger.error('Server', 'Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

export default server;
