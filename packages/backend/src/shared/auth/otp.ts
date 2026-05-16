import crypto from 'crypto';
import { Logger } from '../utils/logger';

const logger = new Logger('otp');

export function generateOTP(length: number = 6): string {
  const digits = '0123456789';
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
}

export function hashOTP(otp: string): string {
  return crypto.createHash('sha256').update(otp).digest('hex');
}

export function verifyOTP(plainOTP: string, hashedOTP: string): boolean {
  const hash = hashOTP(plainOTP);
  return hash === hashedOTP;
}

export function generateOTPToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export const OTP_VALIDITY_MINUTES = 5;
export const OTP_MAX_ATTEMPTS = 3;
export const OTP_LOCKOUT_MINUTES = 10;
