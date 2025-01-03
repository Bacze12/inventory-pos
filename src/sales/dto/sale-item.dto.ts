import { ApiProperty } from '@nestjs/swagger';

export class SaleItemDto {
  @ApiProperty({ description: 'Cantidad del producto', example: 2 })
  public quantity: number;

  @ApiProperty({ description: 'Precio del producto', example: 150.75 })
  public price: number;

  @ApiProperty({ description: 'ID del producto asociado', example: 1 })
  public productId: string;
}
