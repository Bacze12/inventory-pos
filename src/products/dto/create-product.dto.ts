import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'ID del producto', example: 1 })
  public id: number;

  @ApiProperty({ description: 'Nombre del producto', example: 'Laptop' })
  public name: string;

  @ApiProperty({ description: 'Precio del producto', example: 1000.5 })
  public price: number;

  @ApiProperty({ description: 'Fecha de creación del producto', example: new Date() })
  public createdAt: Date;
}
