import bcrypt from 'bcryptjs';
import { CreateUserDTO, UpdateUserDTO } from '../dtos/user.dto';
import { AppError } from '../middlewares/error.middleware';
import { UserRepository } from '../repositories/user.repository';

export const UserService = (userRepo = UserRepository()) => ({
  getAll: () => userRepo.findAll(),

  getById: (id: string) => userRepo.findById(id),

  create: async (data: CreateUserDTO) => {
    const existingUser = await userRepo.findByEmail(data.email);
    const hashedPassword = await bcrypt.hash(data.password, 10);

    if (existingUser) {
      throw new AppError('Email already exists', 409);
    }
    return userRepo.create({
      name: data.name,
      email: data.email.toLowerCase().trim(),
      password: hashedPassword,
    });
  },

  update: async (id: string, data: UpdateUserDTO) => {
    if (data.email) {
      const existingUser = await userRepo.findByEmail(data.email);
      if (existingUser && existingUser.id !== id) {
        throw new AppError('Email already exists', 409);
      }
    }
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    return userRepo.update(id, data);
  },

  remove: async (id: string) => {
    const existingUser = await userRepo.findById(id);
    if (!existingUser) {
      throw new AppError('User not found', 404);
    }
    return userRepo.delete(id);
  },

  findByEmail: async (email: string) => {
    return await userRepo.findByEmail(email);
  },

  validatePassword: async (plain: string, hash: string) => {
    return await bcrypt.compare(plain, hash);
  },
});
