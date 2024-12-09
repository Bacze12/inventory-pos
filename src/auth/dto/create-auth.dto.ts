import { IsEmail, IsString, IsNotEmpty, MinLength, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';

export class CreateAuthDto {
  @ApiProperty({ example: 'user@example.com', description: 'Email del usuario' })
  @IsEmail()
  public email: string;

  @ApiProperty({ example: 'John Doe', description: 'Nombre del usuario' })
  @IsString()
  @IsNotEmpty()
  public name: string;

  @ApiProperty({ 
    enum: UserRole,
    default: UserRole.CASHIER,
    description: 'Rol del usuario' 
  })
  @IsEnum(UserRole)
  public role: UserRole;

  @ApiProperty({ 
    example: '123456',
    description: 'Contraseña del usuario (mínimo 6 caracteres)' 
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  public password: string;
}