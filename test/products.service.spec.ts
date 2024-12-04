import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from '../src/products/products.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from '../src/products/dto/create-product.dto';
import { UpdateProductDto } from '../src/products/dto/update-product.dto';

describe('ProductsService', () => {
  let service: ProductsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: PrismaService,
          useValue: {
            product: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call PrismaService.product.create', async () => {
    const dto: CreateProductDto = { name: 'Test Product', price: 100 };
    await service.create(dto);
    expect(prisma.product.create).toHaveBeenCalledWith({ data: dto });
  });

  it('should call PrismaService.product.findMany', async () => {
    await service.findAll();
    expect(prisma.product.findMany).toHaveBeenCalled();
  });

  it('should call PrismaService.product.findUnique', async () => {
    const id = 1;
    await service.findOne(id);
    expect(prisma.product.findUnique).toHaveBeenCalledWith({ where: { id } });
  });

  it('should call PrismaService.product.update', async () => {
    const id = 1;
    const dto: UpdateProductDto = { name: 'Updated Product', price: 200 };
    await service.update(id, dto);
    expect(prisma.product.update).toHaveBeenCalledWith({ where: { id }, data: dto });
  });

  it('should call PrismaService.product.delete', async () => {
    const id = 1;
    await service.remove(id);
    expect(prisma.product.delete).toHaveBeenCalledWith({ where: { id } });
  });
});
