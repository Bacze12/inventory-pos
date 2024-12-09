import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'Nombre del producto' })
  public name: string;

  @ApiProperty({ description: 'Precio base del producto' })
  public price: number;

  @ApiProperty({ description: 'Código SKU del producto', required: false })
  public sku?: string;

  @ApiProperty({ description: 'Precio de compra', required: false })
  public purchasePrice?: number;

  @ApiProperty({ description: 'Porcentaje de margen', required: false })
  public marginPercent?: number;

  @ApiProperty({ description: 'Precio de venta', required: false })
  public sellingPrice?: number;

  @ApiProperty({ description: 'Precio final con impuestos', required: false })
  public finalPrice?: number;

  @ApiProperty({ description: 'Precio mínimo de venta', required: false })
  public minSellingPrice?: number;

  @ApiProperty({ description: 'Tiene impuesto adicional', default: false })
  public hasExtraTax: boolean;

  @ApiProperty({ description: 'Tasa de impuesto adicional', required: false })
  public extraTaxRate?: number;

  @ApiProperty({ description: 'Está exento de IVA', default: false })
  public isIvaExempt: boolean;

  @ApiProperty({ description: 'Stock actual', default: 0 })
  public stock: number;

  @ApiProperty({ description: 'ID de la categoría' })
  public categoryId: number;

  @ApiProperty({ description: 'ID del proveedor' })
  public supplierId: number;
}