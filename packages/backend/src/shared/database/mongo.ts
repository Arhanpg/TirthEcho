import mongoose from 'mongoose';
import { Logger } from '../utils/logger';

const logger = new Logger('mongodb');

let cachedConnection: typeof mongoose | null = null;

export async function connectMongo() {
  if (cachedConnection) {
    logger.info('Using cached MongoDB connection');
    return cachedConnection;
  }

  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI environment variable is not set');
    }

    const conn = await mongoose.connect(mongoUri, {
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });

    logger.info('✅ MongoDB connected successfully');
    cachedConnection = conn;
    return conn;
  } catch (error) {
    logger.error('❌ MongoDB connection failed:', error);
    throw error;
  }
}

export function disconnectMongo() {
  if (cachedConnection) {
    return mongoose.disconnect();
  }
}

export default cachedConnection;
