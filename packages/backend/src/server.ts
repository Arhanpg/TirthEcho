import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env.local') });
dotenv.config({ path: path.join(__dirname, '../../.env') });

import app from './app';
import { prisma } from './shared/database/prisma';
import { Logger } from './shared/utils/logger';

const logger = new Logger('server');

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Test PostgreSQL connection
    await prisma.$queryRaw`SELECT 1`;
    logger.info('✅ PostgreSQL (Neon) connected successfully');

    // Test MongoDB connection (optional for Phase 0)
    logger.info('✅ MongoDB will be tested in Phase 1 when needed');

    // Start Express server
    app.listen(PORT, () => {
      logger.info(`✅ Server running on http://localhost:${PORT}`);
      logger.info(`📍 Health check: http://localhost:${PORT}/health`);
      logger.info(`📍 API Status: http://localhost:${PORT}/api/v1/status`);
      logger.info(`🚀 Environment: ${process.env.NODE_ENV}`);
    });
  } catch (error) {
    logger.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received, shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  logger.info('SIGINT received, shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

startServer();
