import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

const userService = UserService();

export const AuthController = {
  async signup(req: Request, res: Response) {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      res.status(400).json({ message: 'Passwords do not match' });
      return;
    }

    const existingUser = await userService.findByEmail(email);
    if (existingUser) {
      res.status(409).json({ message: 'Email already exists' });
      return;
    }

    const user = await userService.create({ name, email, password });
    const token = AuthService.generateToken({ id: user.id, email: user.email });

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  },

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await userService.findByEmail(email);
    if (!user) {
      res.status(401).json({ message: 'User not found' });
      return;
    }

    const valid = await userService.validatePassword(password, user.password);
    if (!valid) {
      res.status(401).json({ message: 'Invalid password' });
      return;
    }

    const token = AuthService.generateToken({ id: user.id, email: user.email });

    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  },

  async logout(req: Request, res: Response) {
    res.clearCookie('jwt');
    res.status(200).json({ message: 'Logged out successfully' });
  },
};
