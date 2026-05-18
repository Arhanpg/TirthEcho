import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: [
      {
        emit: 'event',
        level: 'query',
      },
      {
        emit: 'stdout',
        level: 'error',
      },
      {
        emit: 'stdout',
        level: 'warn',
      },
    ],
  });

// Log queries in development
if (process.env.NODE_ENV === 'development') {
  // Query logging disabled due to complex Prisma type system
  // Uncomment below if needed for debugging
  // prisma.$on('query' as any, (e: any) => {
  //   logger.debug(`Query: ${e.query}`);
  //   logger.debug(`Params: ${e.params}`);
  //   logger.debug(`Duration: ${e.duration}ms`);
  // });
}

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
