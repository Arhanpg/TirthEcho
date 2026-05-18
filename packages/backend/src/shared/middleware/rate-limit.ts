import { Request, Response, NextFunction } from 'express';
import { getRedis } from '../database/redis';
import { Logger } from '../utils/logger';

const logger = new Logger('rate-limit');

interface RateLimitConfig {
  windowMs: number; // milliseconds
  max: number; // max requests per window
}

const defaultConfig: RateLimitConfig = {
  windowMs: 60 * 1000, // 1 minute
  max: 100,
};

const endpointConfigs: Record<string, RateLimitConfig> = {
  // Auth endpoints - more strict
  '/api/v1/auth/send-otp': { windowMs: 10 * 60 * 1000, max: 3 },
  '/api/v1/auth/verify-otp': { windowMs: 10 * 60 * 1000, max: 5 },
  '/api/v1/auth/login': { windowMs: 15 * 60 * 1000, max: 5 },

  // Public endpoints - less strict
  '/api/v1/places': { windowMs: 60 * 1000, max: 100 },
  '/api/v1/places/search': { windowMs: 60 * 1000, max: 30 },

  // Upload endpoints
  '/api/v1/media/upload': { windowMs: 60 * 60 * 1000, max: 10 },
};

export function rateLimitMiddleware(req: Request, res: Response, next: NextFunction) {
  // Skip rate limiting in test environment
  if (process.env.NODE_ENV === 'test') {
    return next();
  }

  // Get Redis client
  let redis;
  try {
    redis = getRedis();
  } catch (error) {
    logger.warn('Redis not available, skipping rate limit');
    return next();
  }

  // Determine rate limit config for this endpoint
  const config = endpointConfigs[req.path] || defaultConfig;

  // Create rate limit key
  const key = `ratelimit:${req.ip}:${req.path}`;

  // Get current count
  redis
    .incr(key)
    .then(async (count): Promise<any> => {
      // Set expiry on first request
      if (count === 1) {
        await redis!.expire(key, Math.ceil(config.windowMs / 1000));
      }

      // Set headers
      res.setHeader('X-RateLimit-Limit', config.max);
      res.setHeader('X-RateLimit-Remaining', Math.max(0, config.max - count));

      // Check if exceeded
      if (count > config.max) {
        logger.warn(`Rate limit exceeded for ${req.ip} on ${req.path}`);
        return res.status(429).json({
          success: false,
          error: {
            code: 'RATE_LIMIT_EXCEEDED',
            message: 'Too many requests, please try again later',
          },
        });
      }

      next();
    })
    .catch((error) => {
      logger.error('Rate limit check error:', error);
      // Continue even if rate limit fails
      next();
    });
}
