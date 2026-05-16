import jwt from 'jsonwebtoken';
import { Logger } from '../utils/logger';
import { JwtPayload } from '../types';

const logger = new Logger('jwt');

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-key-change-in-production';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '15m';
const JWT_REFRESH_EXPIRE = process.env.JWT_REFRESH_EXPIRE || '7d';

export function generateAccessToken(payload: any): string {
  try {
    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRE,
      algorithm: 'HS256',
    });
    return token;
  } catch (error) {
    logger.error('Error generating access token:', error);
    throw error;
  }
}

export function generateRefreshToken(payload: any): string {
  try {
    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_REFRESH_EXPIRE,
      algorithm: 'HS256',
    });
    return token;
  } catch (error) {
    logger.error('Error generating refresh token:', error);
    throw error;
  }
}

export function verifyToken(token: string): JwtPayload {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    return decoded;
  } catch (error) {
    logger.error('Token verification failed:', error);
    throw new Error('Invalid or expired token');
  }
}

export function decodeToken(token: string): any {
  try {
    const decoded = jwt.decode(token);
    return decoded;
  } catch (error) {
    logger.error('Token decode failed:', error);
    return null;
  }
}

export function getTokenExpiry(token: string): number | null {
  const decoded = decodeToken(token);
  return decoded?.exp || null;
}
