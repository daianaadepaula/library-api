import { CreateUserDTO, UpdateUserDTO } from '../dtos/user.dto';
import { UserRepository } from '../repositories/user.repository';

const userRepo = UserRepository();

export const UserService = {
  getAll: () => userRepo.findAll(),

  getById: (id: string) => userRepo.findById(id),

  create: (data: CreateUserDTO) => userRepo.create(data),

  update: (id: string, data: UpdateUserDTO) => userRepo.update(id, data),

  remove: (id: string) => userRepo.delete(id),
};
