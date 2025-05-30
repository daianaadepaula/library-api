import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log('✔  Connection to the database established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    await prisma.$disconnect();
    process.exit(1);
  }
};
