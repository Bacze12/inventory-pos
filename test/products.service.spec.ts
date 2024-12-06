import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from '../src/products/products.service';
import { PrismaService } from '../prisma/prisma.service';
import { HttpException, HttpStatus } from '@nestjs/common';

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

    jest.spyOn(console, 'error').mockImplementation(() => {}); // Silencia console.error
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Restaura el comportamiento original
  });

  it('should call PrismaService.product.findUnique and return the product', async () => {
    const id = 1;
    const result = {
      id,
      name: 'Test Product',
      price: 100,
      createdAt: new Date(),
    };
    jest.spyOn(prisma.product, 'findUnique').mockResolvedValue(result);

    expect(await service.findOne(id)).toBe(result);
    expect(prisma.product.findUnique).toHaveBeenCalledWith({ where: { id } });
  });

  it('should throw a 404 error if product not found in findUnique', async () => {
    const id = 1;
    jest.spyOn(prisma.product, 'findUnique').mockResolvedValue(null);

    await expect(service.findOne(id)).rejects.toThrow('Product not found');
  });

  it('should call PrismaService.product.update and return the updated product', async () => {
    const id = 1;
    const dto = { name: 'Updated Product', price: 200 };
    const result = { id, ...dto, createdAt: new Date() };
    jest.spyOn(prisma.product, 'update').mockResolvedValue(result);

    expect(await service.update(id, dto)).toBe(result);
    expect(prisma.product.update).toHaveBeenCalledWith({
      where: { id },
      data: dto,
    });
  });

  it('should throw a 404 error if product not found in update', async () => {
    const id = 1;
    const dto = { name: 'Updated Product', price: 200 };
    jest.spyOn(prisma.product, 'update').mockImplementation(() => {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    });

    await expect(service.update(id, dto)).rejects.toThrow('Product not found');
  });

  it('should call PrismaService.product.delete and return the removed product', async () => {
    const id = 1;
    const result = {
      id,
      name: 'Test Product',
      price: 100,
      createdAt: new Date(),
    };
    jest.spyOn(prisma.product, 'delete').mockResolvedValue(result);

    expect(await service.remove(id)).toBe(result);
    expect(prisma.product.delete).toHaveBeenCalledWith({ where: { id } });
  });

  it('should throw a 404 error if product not found in delete', async () => {
    const id = 1;
    jest.spyOn(prisma.product, 'delete').mockImplementation(() => {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    });

    await expect(service.remove(id)).rejects.toThrow('Product not found');
  });
});
