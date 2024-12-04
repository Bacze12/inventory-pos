import { ApiProperty } from '@nestjs/swagger';
import { SaleItemDto } from './sale-item.dto';

export class CreateSaleDto {
  @ApiProperty({ description: 'Lista de productos vendidos' })
  public items: SaleItemDto[];
}
