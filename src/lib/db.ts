import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export const connectDB = async () => {
	try {
		await prisma.$connect(); // método correto no Prisma
		console.log('✔  Connection to the database established successfully.');
	} catch (error) {
		console.error('❌ Unable to connect to the database:', error);
	}
};
