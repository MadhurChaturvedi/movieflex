import dotenv from 'dotenv';
import path from 'path';

// Load .env from root or local directory
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config();

export const config = {
  env: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV !== 'production',
  port: parseInt(process.env.PORT || '5000', 10),
  
  cors: {
    origin: process.env.CLIENT_URL || process.env.WEB_URL || 'http://localhost:5173',
    credentials: true,
  },

  db: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/cinematch',
  },

  jwt: {
    secret: process.env.JWT_SECRET || 'cinematch_super_dev_secret_key_change_in_production_98765',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },

  tmdb: {
    apiKey: process.env.TMDB_API_KEY || '',
    baseUrl: process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3',
  },

  ai: {
    provider: process.env.LLM_PROVIDER || 'mock',
    openaiApiKey: process.env.OPENAI_API_KEY || '',
    geminiApiKey: process.env.GEMINI_API_KEY || '',
    embeddingApiKey: process.env.EMBEDDING_API_KEY || '',
  },

  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10), // 15 mins
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '300', 10),
  },
};
