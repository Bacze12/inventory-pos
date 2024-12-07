import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../src/users/users.controller';
import { UsersService } from '../src/users/users.service';
import { UpdateUserDto } from '../src/users/dto/user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            deactivate: jest.fn(),
            reactivate: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should call UsersService.findAll with correct parameters', async () => {
      const isActive = 'true';
      await controller.findAll(isActive);
      expect(service.findAll).toHaveBeenCalledWith(true);
    });

    it('should return all users', async () => {
      const result = [
        { id: 1, email: 'test@example.com', name: 'Test User', role: 'user', password: 'password123', createdAt: new Date(), updatedAt: new Date(), isActive: true },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);
      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should call UsersService.findOne with correct parameters', async () => {
      const id = '1';
      await controller.findOne(+id);
      expect(service.findOne).toHaveBeenCalledWith(+id);
    });

    it('should return a single user by ID', async () => {
      const id = '1';
      const result = {
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
        role: 'user',
        password: 'password123',
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(result);
      expect(await controller.findOne(+id)).toBe(result);
    });
  });

  describe('update', () => {
    it('should call UsersService.update with correct parameters', async () => {
      const id = '1';
      const dto: UpdateUserDto = { name: 'Updated User', email: 'updated@example.com' };
      await controller.update(+id, dto);
      expect(service.update).toHaveBeenCalledWith(+id, dto);
    });

    it('should return the updated user', async () => {
      const id = '1';
      const dto: UpdateUserDto = { name: 'Updated User', email: 'updated@example.com' };
      const result = {
        id: 1,
        email: 'updated@example.com',
        name: 'Updated User',
        role: 'user',
        password: 'password123',
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
      };
      jest.spyOn(service, 'update').mockResolvedValue(result);
      expect(await controller.update(+id, dto)).toBe(result);
    });
  });

  describe('deactivate', () => {
    it('should call UsersService.deactivate with correct parameters', async () => {
      const id = '1';
      await controller.deactivate(+id);
      expect(service.deactivate).toHaveBeenCalledWith(+id);
    });

    it('should return the deactivated user', async () => {
      const id = '1';
      const result = {
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
        role: 'user',
        password: 'password123',
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: false,
      };
      jest.spyOn(service, 'deactivate').mockResolvedValue(result);
      expect(await controller.deactivate(+id)).toBe(result);
    });
  });

  describe('reactivate', () => {
    it('should call UsersService.reactivate with correct parameters', async () => {
      const id = '1';
      await controller.reactivate(+id);
      expect(service.reactivate).toHaveBeenCalledWith(+id);
    });

    it('should return the reactivated user', async () => {
      const id = '1';
      const result = {
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
        role: 'user',
        password: 'password123',
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
      };
      jest.spyOn(service, 'reactivate').mockResolvedValue(result);
      expect(await controller.reactivate(+id)).toBe(result);
    });
  });
}
