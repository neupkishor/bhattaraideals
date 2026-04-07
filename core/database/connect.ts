import { PrismaClient } from '@prisma/client';
import { getSingleton } from '@/core/helpers';

const PRISMA_SINGLETON_KEY = 'core.database.prisma.client';

function createPrismaClient() {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'warn', 'error'] : ['error'],
  });
}

export type DatabaseConnection = PrismaClient;

export function getClient(): DatabaseConnection {
  return getSingleton(PRISMA_SINGLETON_KEY, createPrismaClient);
}

export async function connect(): Promise<DatabaseConnection> {
  const client = getClient();
  await client.$connect();
  return client;
}

export async function disconnect() {
  await getClient().$disconnect();
}
