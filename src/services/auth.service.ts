import jwt from 'jsonwebtoken';
import redisClient from '../lib/client';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access_secret';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refresh_secret';

export const AuthService = {
  // gera o accessToken
  generateAccessToken(payload: { id: string; email: string }) {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '15m' }); // 15 minutos
  },

  // gera o refreshToken
  generateRefreshToken(payload: { id: string; email: string }) {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: '7d' }); // 7 dias
  },

  // armazena o refreshToken
  async storeRefreshToken(token: string, userId: string) {
    await redisClient.set(`refreshToken:${token}`, userId, { EX: 7 * 24 * 60 * 60 }); // 7 dias
  },

  // revoga o refreshToken
  async revokeRefreshToken(token: string) {
    await redisClient.del(`refreshToken:${token}`);
  },

  // verifica se o refreshToken é valido e armazenado
  async isRefreshTokenValid(token: string) {
    const userId = await redisClient.get(`refreshToken:${token}`);
    return !!userId;
  },

  // verifica se o accessToken é valido
  verifyAccessToken(token: string) {
    return jwt.verify(token, ACCESS_TOKEN_SECRET);
  },

  // verifica se o refreshToken é valido
  verifyRefreshToken(token: string) {
    return jwt.verify(token, REFRESH_TOKEN_SECRET);
  },
};
