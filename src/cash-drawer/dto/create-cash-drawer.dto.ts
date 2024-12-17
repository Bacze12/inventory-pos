import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsOptional, IsEnum } from 'class-validator';
import { MovementType } from '@prisma/client';

export class CreateCashDrawerDto {
  @ApiProperty({ description: 'ID del turno asociado al movimiento' })
  @IsNotEmpty()
  @IsNumber()
  public shiftId: number;

  @ApiProperty({ description: 'Tipo de movimiento', enum: MovementType })
  @IsNotEmpty()
  @IsEnum(MovementType)
  public type: MovementType;

  @ApiProperty({ description: 'Monto del movimiento' })
  @IsNotEmpty()
  @IsNumber()
  public amount: number;

  @ApiProperty({ description: 'Razón del movimiento', required: false })
  @IsOptional()
  @IsString()
  public reason?: string;
}
