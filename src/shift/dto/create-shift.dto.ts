import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsDate, IsOptional, IsEnum } from 'class-validator';
import { ShiftStatus } from '@prisma/client';

export class CreateShiftDto {
  @ApiProperty({ description: 'ID del usuario asociado al turno' })
  @IsNotEmpty()
  @IsNumber()
  public userId: number;

  @ApiProperty({ description: 'Estado del turno', enum: ShiftStatus, default: ShiftStatus.OPEN })
  @IsEnum(ShiftStatus)
  public status: ShiftStatus;

  @ApiProperty({ description: 'Efectivo inicial del turno' })
  @IsNotEmpty()
  @IsNumber()
  public initialCash: number;

  @ApiProperty({ description: 'Fecha y hora de inicio del turno' })
  @IsNotEmpty()
  @IsDate()
  public startTime: Date;

  @ApiProperty({ description: 'Fecha y hora de finalización del turno', required: false })
  @IsOptional()
  @IsDate()
  public endTime?: Date;
}
