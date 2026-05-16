import Redis from 'ioredis';
import { Logger } from '../utils/logger';

const logger = new Logger('redis');

let redis: Redis | null = null;

export function initRedis() {
  try {
    const redisUrl = process.env.UPSTASH_REDIS_URL;

    if (!redisUrl) {
      throw new Error('UPSTASH_REDIS_URL environment variable is not set');
    }

    redis = new Redis(redisUrl, {
      maxRetriesPerRequest: null,
      enableReadyCheck: false,
    });

    redis.on('connect', () => {
      logger.info('✅ Redis (Upstash) connected successfully');
    });

    redis.on('error', (err) => {
      logger.error('❌ Redis connection error:', err);
    });

    return redis;
  } catch (error) {
    logger.error('Failed to initialize Redis:', error);
    throw error;
  }
}

export function getRedis(): Redis {
  if (!redis) {
    throw new Error('Redis not initialized. Call initRedis() first.');
  }
  return redis;
}

export async function disconnectRedis() {
  if (redis) {
    await redis.quit();
    logger.info('Redis disconnected');
  }
}

export default redis;
