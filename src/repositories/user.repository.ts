import { prisma } from '../lib/db';

export const UserRepository = () => {
  return {
    findAll: () => prisma.user.findMany(),

    findById: (id: string) => prisma.user.findUnique({ where: { id } }),

    create: (data: { name: string; email: string; password: string }) =>
      prisma.user.create({ data }),

    update: (id: string, data: Partial<{ name?: string; email?: string; password?: string }>) =>
      prisma.user.update({ where: { id }, data }),

    delete: (id: string) => prisma.user.delete({ where: { id } }),
  };
};
