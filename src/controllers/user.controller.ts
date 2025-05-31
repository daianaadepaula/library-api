import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

const userService = UserService();

export const UserController = {
  async getAll(req: Request, res: Response) {
    const users = await userService.getAll();
    res.json(users);
    return;
  },

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const user = await userService.getById(id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(user);
    return;
  },

  async create(req: Request, res: Response) {
    const user = await userService.create(req.body);
    res.status(201).json(user);
    return;
  },

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const updatedUser = await userService.update(id, req.body);
    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(updatedUser);
    return;
  },

  async remove(req: Request, res: Response) {
    const { id } = req.params;
    const deletedUser = await userService.remove(id);
    if (!deletedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json({ message: 'User deleted successfully' });
    return;
  },
};
