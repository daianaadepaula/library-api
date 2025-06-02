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

    const user = await userService.create({ name, email, password, confirmPassword });
    const accessToken = AuthService.generateAccessToken({ id: user.id, email: user.email });

    res.status(201).json({
      message: 'User created successfully',
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email.toLowerCase().trim(),
      },
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

    const accessToken = AuthService.generateAccessToken({ id: user.id, email: user.email });
    const refreshToken = AuthService.generateRefreshToken({ id: user.id, email: user.email });

    await AuthService.storeRefreshToken(refreshToken, user.id);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true, // Use true se estiver usando HTTPS
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
    });

    res.json({
      accessToken,
      user: { id: user.id, name: user.name, email: user.email },
    });
  },

  async logout(req: Request, res: Response) {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
      res.status(400).json({ message: 'Refresh token is required' });
      return;
    }
    await AuthService.revokeRefreshToken(refreshToken);
    res.status(200).json({ message: 'Logged out successfully' });
    return;
  },

  async refreshToken(req: Request, res: Response) {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(400).json({ message: 'Refresh token is required' });
      return;
    }

    try {
      // Verifica assinatura JWT
      const decoded = AuthService.verifyRefreshToken(refreshToken) as { id: string; email: string };

      // Confere no Redis se é um token válido
      const isValid = await AuthService.isRefreshTokenValid(refreshToken);
      if (!isValid) {
        res.status(401).json({ message: 'Invalid refresh token' });
        return;
      }

      // Gera novos tokens
      const newAccessToken = AuthService.generateAccessToken({
        id: decoded.id,
        email: decoded.email,
      });
      const newRefreshToken = AuthService.generateRefreshToken({
        id: decoded.id,
        email: decoded.email,
      });

      // Armazena novo refreshToken
      await AuthService.storeRefreshToken(newRefreshToken, decoded.id);

      // Revoga o antigo
      await AuthService.revokeRefreshToken(refreshToken);

      res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
      return;
    } catch (error) {
      console.error(error);
      res.status(403).json({ message: 'Token inválido ou expirado' });
      return;
    }
  },
};
