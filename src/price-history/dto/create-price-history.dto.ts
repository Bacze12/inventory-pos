import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePriceHistoryDto {
  @ApiProperty({ description: 'ID del producto' })
  @IsNotEmpty()
  @IsNumber()
  public productId: number;

  @ApiProperty({ description: 'Precio de compra' })
  @IsNotEmpty()
  @IsNumber()
  public purchasePrice: number;

  @ApiProperty({ description: 'Precio de venta' })
  @IsNotEmpty()
  @IsNumber()
  public sellingPrice: number;

  @ApiProperty({ description: 'Razón del cambio de precio', required: false })
  @IsOptional()
  @IsString()
  public reason?: string;
}
