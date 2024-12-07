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

  it('should call SalesService.createSale with correct parameters', async () => {
    const dto: CreateSaleDto = {
      items: [
        { quantity: 2, price: 150.75, productId: 1 },
      ],
    };
    await controller.create(dto);
    expect(service.createSale).toHaveBeenCalledWith(dto);
  });

  it('should call SalesService.findAll', async () => {
    await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should call SalesService.findOne with correct parameters', async () => {
    const id = '1';
    await controller.findOne(id);
    expect(service.findOne).toHaveBeenCalledWith(+id);
  });

  it('should return the created sale', async () => {
    const dto: CreateSaleDto = {
      items: [
        { quantity: 2, price: 150.75, productId: 1 },
      ],
    };
    const result = { id: 1, ...dto, total: 301.5 };
    jest.spyOn(service, 'createSale').mockResolvedValue(result);
    expect(await controller.create(dto)).toBe(result);
  });

  it('should return all sales', async () => {
    const result = [
      { id: 1, items: [{ quantity: 2, price: 150.75, productId: 1 }], total: 301.5 },
    ];
    jest.spyOn(service, 'findAll').mockResolvedValue(result);
    expect(await controller.findAll()).toBe(result);
  });

  it('should return a single sale by ID', async () => {
    const id = '1';
    const result = {
      id: 1,
      items: [{ quantity: 2, price: 150.75, productId: 1 }],
      total: 301.5,
    };
    jest.spyOn(service, 'findOne').mockResolvedValue(result);
    expect(await controller.findOne(id)).toBe(result);
  });
});
