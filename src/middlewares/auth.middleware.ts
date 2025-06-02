import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { JwtPayload } from '../types/auth';

export async function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Missing or malformed token' });
    return;
  }

  const token = authHeader.split(' ')[1];
  console.log('🛡️ Token recebido:', token);

  try {
    const decoded = AuthService.verifyAccessToken(token);
    if (typeof decoded === 'string') {
      throw new Error('Invalid token payload');
    }
    req.user = decoded as JwtPayload;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ message: 'Invalid token' });
    return;
  }
}
