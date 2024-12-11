import { ApiProperty } from '@nestjs/swagger';

export class CreateCategorieDto {
  @ApiProperty({ description: 'Nombre de la categoría' })
  public name: string;

  @ApiProperty({ description: 'Descripción de la categoría', required: false })
  public description: string;

  @ApiProperty({ description: 'Esta activo', default: true })
  public isActive: boolean = true;

  @ApiProperty({ description: 'Fecha de creación', required: false })
  public createdAt?: Date;
}