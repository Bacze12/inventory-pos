import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductProfitabilityDto {
  @ApiProperty({ description: 'ID del producto' })
  @IsNotEmpty()
  @IsString()
  public productId: string;

  @ApiProperty({ description: 'Costo del producto' })
  @IsNotEmpty()
  @IsNumber()
  public costPrice: number;

  @ApiProperty({ description: 'Precio de venta' })
  @IsNotEmpty()
  @IsNumber()
  public sellPrice: number;

  @ApiProperty({ description: 'Margen de ganancia' })
  @IsNotEmpty()
  @IsNumber()
  public margin: number;

  @ApiProperty({ description: 'Tasa de margen de ganancia' })
  @IsNotEmpty()
  @IsNumber()
  public marginRate: number;
}
