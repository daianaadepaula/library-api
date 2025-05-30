import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'jwt_secret_key';

export const AuthService = {
  generateToken(payload: { id: string; email: string }) {
    return jwt.sign(payload, SECRET, { expiresIn: '1d' });
  },

  verifyToken(token: string) {
    return jwt.verify(token, SECRET);
  },
};
