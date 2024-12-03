import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'Nombre del producto', example: 'Laptop' })
  name: string;

  @ApiProperty({ description: 'Precio del producto', example: 1000.5 })
  price: number;
}
