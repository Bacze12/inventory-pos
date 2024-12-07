import { IsEmail, IsString, IsNotEmpty, MinLength, IsEnum } from 'class-validator';
import { UserRole } from '@prisma/client';

export class CreateAuthDto {
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsEnum(UserRole)
  role: UserRole;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  public password: string;
}