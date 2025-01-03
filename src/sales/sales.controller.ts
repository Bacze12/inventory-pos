import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

/**
 * Controller for handling sales-related operations.
 * This controller provides endpoints for creating, retrieving, and managing sales.
 */
@ApiTags('Sales')
@Controller('sales')
export class SalesController {
  public constructor(private readonly salesService: SalesService) {}

  /**
   * Creates a new sale.
   *
   * @param createSaleDto - The data transfer object containing sale details.
   * @returns The created sale.
   */
  @Post()
  @ApiOperation({ summary: 'Create a new sale' })
  @ApiResponse({ status: 201, description: 'Sale created successfully' })
  public async create(@Body() createSaleDto: CreateSaleDto) {
    return this.salesService.createSale(createSaleDto);
  }

  /**
   * Retrieves all sales.
   *
   * @returns An array of all sales.
   */
  @Get()
  @ApiOperation({ summary: 'Retrieve all sales' })
  public async findAll() {
    return this.salesService.findAll();
  }

  /**
   * Retrieves a single sale by ID.
   *
   * @param id - The ID of the sale.
   * @returns The sale with the specified ID.
   */
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a sale by ID' })
  public async findOne(@Param('id') id: string) {
    return this.salesService.findOne(id);
  }
}
