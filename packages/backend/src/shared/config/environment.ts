export const environment = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRE: process.env.JWT_EXPIRE || '15m',
  JWT_REFRESH_EXPIRE: process.env.JWT_REFRESH_EXPIRE || '7d',
  DATABASE_URL: process.env.DATABASE_URL,
  DATABASE_POOL_URL: process.env.DATABASE_POOL_URL,
  MONGODB_URI: process.env.MONGODB_URI,
  UPSTASH_REDIS_URL: process.env.UPSTASH_REDIS_URL,
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
};

export function validateEnvironment() {
  const required = [
    'DATABASE_URL',
    'DATABASE_POOL_URL',
    'JWT_SECRET',
  ];

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}`
    );
  }
}
