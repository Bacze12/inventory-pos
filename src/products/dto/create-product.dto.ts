import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsOptional, IsBoolean, Min } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ description: 'Nombre del producto' })
  @IsNotEmpty()
  @IsString()
  public name: string;

  @ApiProperty({ description: 'Precio de compra del producto' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  public purchasePrice: number;

  @ApiProperty({ description: 'Porcentaje de margen deseado (ejemplo: 20 para 20%)' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  public marginPercent: number;

  @ApiProperty({ description: 'Código SKU del producto', required: false })
  @IsOptional()
  @IsString()
  public sku?: string;

  @ApiProperty({ description: 'Tiene impuesto adicional', default: false })
  @IsOptional()
  @IsBoolean()
  public hasExtraTax: boolean = false;

  @ApiProperty({ description: 'Tasa de impuesto adicional', required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  public extraTaxRate?: number;

  @ApiProperty({ description: 'Está exento de IVA', default: false })
  @IsOptional()
  @IsBoolean()
  public isIvaExempt: boolean = false;

  @ApiProperty({ description: 'Stock actual', default: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  public stock: number = 0;

  @ApiProperty({ description: 'ID de la categoría' })
  @IsNotEmpty()
  @IsNumber()
  public categoryId: number;

  @ApiProperty({ description: 'ID del proveedor' })
  @IsNotEmpty()
  @IsNumber()
  public supplierId: number;
}