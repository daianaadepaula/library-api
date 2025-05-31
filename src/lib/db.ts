import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log('✔  Connection to the database established successfully.');
  } catch (error) {
    await prisma.$disconnect();
    console.error('❌ Unable to connect to the database:', error);
    process.exit(1);
  }
};
