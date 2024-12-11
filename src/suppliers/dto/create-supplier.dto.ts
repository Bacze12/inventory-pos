import { ApiProperty } from '@nestjs/swagger';

export class CreateSupplierDto {
  @ApiProperty({ description: 'Nombre del proveedor' })
  public name: string;

  @ApiProperty({ description: 'Dirección del proveedor', required: false })
  public address: string;

  @ApiProperty({ description: 'Teléfono del proveedor', required: false })
  public phone: string;

  @ApiProperty({ description: 'Correo electrónico del proveedor', required: true })
  public email: string;

  @ApiProperty({ description: 'Esta activo', default: true })
  public isActive: boolean = true;

  
}