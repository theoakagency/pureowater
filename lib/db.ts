// lib/db.ts
// Prisma client singleton — safe for Next.js hot reload in development
// Run `npx prisma generate` before using

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require('@prisma/client')

type PrismaClientType = InstanceType<typeof PrismaClient>

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientType | undefined
}

export const prisma: PrismaClientType =
  globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
