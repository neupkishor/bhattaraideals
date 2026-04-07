import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: '@/core/database/schema.prisma',
  migrations: {
    path: '@/core/database/migrations',
  },
  datasource: {
    // Keep optional so `prisma generate` can run even when DATABASE_URL is not set.
    url: process.env.DATABASE_URL ?? '',
  },
});
