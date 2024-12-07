import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../src/auth/auth.controller';
import { AuthService } from '../src/auth/auth.service';
import { CreateAuthDto } from '../src/auth/dto/create-auth.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            registerUser: jest.fn(),
            validateUser: jest.fn(),
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should call AuthService.registerUser with correct parameters', async () => {
      const dto: CreateAuthDto = {
        email: 'test@example.com',
        password: 'password',
        role: 'user',
        name: 'Test User',
      };
      await controller.register(dto);
      expect(service.registerUser).toHaveBeenCalledWith(dto);
    });

    it('should return the registered user', async () => {
      const dto: CreateAuthDto = {
        email: 'test@example.com',
        password: 'password',
        role: 'user',
        name: 'Test User',
      };
      const result = { id: 1, ...dto };
      jest.spyOn(service, 'registerUser').mockResolvedValue(result);
      expect(await controller.register(dto)).toBe(result);
    });
  });

  describe('login', () => {
    it('should call AuthService.validateUser with correct parameters', async () => {
      const dto: CreateAuthDto = {
        email: 'test@example.com',
        password: 'password',
        role: 'user',
        name: 'Test User',
      };
      await controller.login(dto);
      expect(service.validateUser).toHaveBeenCalledWith(dto.email, dto.password);
    });

    it('should return a message if validation fails', async () => {
      const dto: CreateAuthDto = {
        email: 'test@example.com',
        password: 'password',
        role: 'user',
        name: 'Test User',
      };
      jest.spyOn(service, 'validateUser').mockResolvedValue(null);
      expect(await controller.login(dto)).toEqual({ message: 'Invalid email or password' });
    });

    it('should return the access token if validation succeeds', async () => {
      const dto: CreateAuthDto = {
        email: 'test@example.com',
        password: 'password',
        role: 'user',
        name: 'Test User',
      };
      const user = { id: 1, ...dto };
      const token = { access_token: 'token' };
      jest.spyOn(service, 'validateUser').mockResolvedValue(user);
      jest.spyOn(service, 'login').mockResolvedValue(token);
      expect(await controller.login(dto)).toBe(token);
    });
  });
});
