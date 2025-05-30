import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserRepository } from '../repositories/user.repository';

export async function authenticate(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    if (!token) {
      res.status(401).json({ message: 'Unauthorized - No token provided' });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || 'jwt_secret_key');

    if (typeof decoded === 'string' || !('id' in decoded)) {
      res.status(401).json({ message: 'Unauthorized - Invalid token payload' });
      return;
    }

    const userRepo = UserRepository();
    const user = await userRepo.findById((decoded as JwtPayload).id);

    if (!user) {
      res.status(401).json({ message: 'Unauthorized - User not found' });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Error authenticating:', error);
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
}
