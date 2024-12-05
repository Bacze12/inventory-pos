import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from '../src/products/products.controller';
import { ProductsService } from '../src/products/products.service';
import { CreateProductDto } from '../src/products/dto/create-product.dto';
import { UpdateProductDto } from '../src/products/dto/update-product.dto';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call ProductsService.create with correct parameters', async () => {
    const dto: CreateProductDto = { name: 'Test Product', price: 100 };
    await controller.create(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should call ProductsService.findAll', async () => {
    await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should call ProductsService.findOne with correct parameters', async () => {
    const id = '1';
    await controller.findOne(id);
    expect(service.findOne).toHaveBeenCalledWith(+id);
  });

  it('should call ProductsService.update with correct parameters', async () => {
    const id = '1';
    const dto: UpdateProductDto = { name: 'Updated Product', price: 200 };
    await controller.update(id, dto);
    expect(service.update).toHaveBeenCalledWith(+id, dto);
  });

  it('should call ProductsService.remove with correct parameters', async () => {
    const id = '1';
    await controller.remove(id);
    expect(service.remove).toHaveBeenCalledWith(+id);
  });

  it('should return the created product', async () => {
    const dto: CreateProductDto = { name: 'Test Product', price: 100 };


    const result = { id: 1, ...dto, createdAt: new Date() };
    

    jest.spyOn(service, 'create').mockResolvedValue(result);
    expect(await controller.create(dto)).toBe(result);
  });

  it('should return all products', async () => {


    const result = [{ id: 1, name: 'Test Product', price: 100, createdAt: new Date() }];

    


    jest.spyOn(service, 'findAll').mockResolvedValue(result);
    expect(await controller.findAll()).toBe(result);
  });

  it('should return a single product by ID', async () => {
    const id = '1';


    const result = { id: 1, name: 'Test Product', price: 100, createdAt: new Date() };

    


    jest.spyOn(service, 'findOne').mockResolvedValue(result);
    expect(await controller.findOne(id)).toBe(result);
  });

  it('should return the updated product', async () => {
    const id = '1';
    const dto: UpdateProductDto = { name: 'Updated Product', price: 200 };


    const result = { id: 1, ...dto, createdAt: new Date() };


    jest.spyOn(service, 'update').mockResolvedValue(result);
    expect(await controller.update(id, dto)).toBe(result);
  });

  it('should return the removed product', async () => {
    const id = '1';


    const result = { id: 1, name: 'Test Product', price: 100, createdAt: new Date() };


    jest.spyOn(service, 'remove').mockResolvedValue(result);
    expect(await controller.remove(id)).toBe(result);
  });
});
