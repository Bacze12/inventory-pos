import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'Nombre del producto' })
  name: string;

  @ApiProperty({ description: 'Precio base del producto' })
  price: number;

  @ApiProperty({ description: 'Código SKU del producto', required: false })
  sku?: string;

  @ApiProperty({ description: 'Precio de compra', required: false })
  purchasePrice?: number;

  @ApiProperty({ description: 'Porcentaje de margen', required: false })
  marginPercent?: number;

  @ApiProperty({ description: 'Precio de venta', required: false })
  sellingPrice?: number;

  @ApiProperty({ description: 'Precio final con impuestos', required: false })
  finalPrice?: number;

  @ApiProperty({ description: 'Precio mínimo de venta', required: false })
  minSellingPrice?: number;

  @ApiProperty({ description: 'Tiene impuesto adicional', default: false })
  hasExtraTax: boolean;

  @ApiProperty({ description: 'Tasa de impuesto adicional', required: false })
  extraTaxRate?: number;

  @ApiProperty({ description: 'Está exento de IVA', default: false })
  isIvaExempt: boolean;

  @ApiProperty({ description: 'Stock actual', default: 0 })
  stock: number;

  @ApiProperty({ description: 'ID de categoría', required: false })
  categoryId?: number;

  @ApiProperty({ description: 'ID de proveedor', required: false })
  supplierId?: number;
}