import { CreateUserDTO, UpdateUserDTO } from '../dtos/user.dto';
import { AppError } from '../middlewares/error.middleware';
import { UserRepository } from '../repositories/user.repository';

const userRepo = UserRepository();

export const UserService = {
  getAll: () => userRepo.findAll(),

  getById: (id: string) => userRepo.findById(id),

  create: async (data: CreateUserDTO) => {
    const existingUser = await userRepo.findByEmail(data.email);
    if (existingUser) {
      throw new AppError('Email already exists', 409);
    }
    return userRepo.create(data);
  },

  update: async (id: string, data: UpdateUserDTO) => {
    if (data.email) { 
      const existingUser = await userRepo.findByEmail(data.email);
      if (existingUser && existingUser.id !== id) {
        throw new AppError('Email already exists', 409);
      }
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
};
