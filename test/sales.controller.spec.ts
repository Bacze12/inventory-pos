import { Test, TestingModule } from '@nestjs/testing';
import { SalesController } from '../src/sales/sales.controller';
import { SalesService } from '../src/sales/sales.service';
import { CreateSaleDto } from '../src/sales/dto/create-sale.dto';

describe('SalesController', () => {
  let controller: SalesController;
  let service: SalesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalesController],
      providers: [
        {
          provide: SalesService,
          useValue: {
            createSale: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<SalesController>(SalesController);
    service = module.get<SalesService>(SalesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call SalesService.createSale with correct parameters', async () => {
      const dto: CreateSaleDto = {
        items: [
          { quantity: 2, price: 100, productId: 1 },
        ],
      };
      await controller.create(dto);
      expect(service.createSale).toHaveBeenCalledWith(dto);
    });

    it('should return the created sale', async () => {
      const dto: CreateSaleDto = {
        items: [
          { quantity: 2, price: 100, productId: 1 },
        ],
      };
      const result = { id: 1, total: 200, items: dto.items };
      jest.spyOn(service, 'createSale').mockResolvedValue(result);
      expect(await controller.create(dto)).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should call SalesService.findAll', async () => {
      await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
    });

    it('should return all sales', async () => {
      const result = [
        { id: 1, total: 200, items: [{ quantity: 2, price: 100, productId: 1 }] },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);
      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should call SalesService.findOne with correct parameters', async () => {
      const id = '1';
      await controller.findOne(id);
      expect(service.findOne).toHaveBeenCalledWith(+id);
    });

    it('should return a single sale by ID', async () => {
      const id = '1';
      const result = {
        id: 1,
        total: 200,
        items: [{ quantity: 2, price: 100, productId: 1 }],
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(result);
      expect(await controller.findOne(id)).toBe(result);
    });
  });
});
