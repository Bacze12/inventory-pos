import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
} from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Suppliers')
@Controller('suppliers')
export class SuppliersController {
  public constructor(private readonly suppliersService: SuppliersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new supplier' })
  @ApiResponse({ status: 201, description: 'Supplier created successfully' })
  public async create(@Body() createSupplierDto: CreateSupplierDto) {
    return this.suppliersService.create(createSupplierDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all suppliers' })
  public async findAll() {
    return this.suppliersService.findAll();
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a supplier' })
  @ApiResponse({ status: 200, description: 'Supplier updated successfully' })
  @ApiResponse({ status: 404, description: 'Supplier not found' })
  public async update(
    @Param('id') id: string,
    @Body() updateSupplierDto: Partial<CreateSupplierDto>,
  ) {
    return this.suppliersService.update(String(id), updateSupplierDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a supplier by ID' })
  @ApiResponse({ status: 200, description: 'Supplier retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Supplier not found' })
  public async findOne(@Param('id') id: string) {
    return this.suppliersService.findOne(String(id));
  }

  @Patch(':id/active')
  @ApiOperation({ summary: 'Activate or deactivate a supplier' })
  @ApiResponse({ status: 200, description: 'Supplier status updated successfully' })
  @ApiResponse({ status: 404, description: 'Supplier not found' })
  public async toggleActiveStatus(
    @Param('id') id: string,
    @Body('isActive') isActive: boolean,
  ) {
    return this.suppliersService.toggleActiveStatus(String(id), isActive);
  }
}