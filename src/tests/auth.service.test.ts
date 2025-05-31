import { AuthService } from '../services/auth.service';

describe('AuthService', () => {
  const payload = { id: '123', email: 'test@example.com' };

  it('should generate a valid JWT token', () => {
    const token = AuthService.generateToken(payload);
    expect(typeof token).toBe('string');
  });

  it('should verify a valid JWT token', () => {
    const token = AuthService.generateToken(payload);
    const decoded = AuthService.verifyToken(token);
    expect(decoded).toMatchObject(payload);
  });
});
