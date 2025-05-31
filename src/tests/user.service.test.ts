import bcrypt from 'bcryptjs';
import { UserService } from '../services/user.service';
import { UserRepository } from '../repositories/user.repository';
import { AppError } from '../middlewares/error.middleware';

// mock tipado automaticamente com todos os métodos
const mockRepo: jest.Mocked<ReturnType<typeof UserRepository>> = {
  findAll: jest.fn(),
  findById: jest.fn(),
  findByEmail: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('UserService', () => {
  let service: ReturnType<typeof UserService>; // cria um service

  beforeEach(() => {
    jest.clearAllMocks(); // limpa os mocks
    service = UserService(mockRepo); // cria um novo service
  });

  it('should create a user if email is not taken', async () => {
    mockRepo.findByEmail.mockResolvedValue(null);
    mockRepo.create.mockResolvedValue({
      id: '1',
      name: 'Test',
      email: 'test@test.com',
      password: 'Password123',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await service.create({
      name: 'Test',
      email: 'test@test.com',
      password: 'Password123',
    });

    expect(mockRepo.findByEmail).toHaveBeenCalledWith('test@test.com');
    expect(mockRepo.create).toHaveBeenCalled(); // espera que o create seja chamado
    expect(result.email).toBe('test@test.com');
  });

  it('should throw error if email already exists', async () => {
    mockRepo.findByEmail.mockResolvedValue({
      id: '1',
      name: 'Test',
      email: 'test@test.com',
      password: 'hashed-password',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await expect(
      service.create({
        name: 'Test',
        email: 'test@test.com',
        password: 'Password123',
      }),
    ).rejects.toThrow(AppError); // espera que o erro seja do tipo AppError
  });

  it('should validate password correctly', async () => {
    const password = 'Password123';
    const hash = await bcrypt.hash(password, 10); // cria um hash como o banco faria
    const isValid = await service.validatePassword(password, hash);

    expect(isValid).toBe(true); // espera que a senha seja válida
  });
});
