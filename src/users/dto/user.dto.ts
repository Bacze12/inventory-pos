import { UserRole } from '@prisma/client';
import { IsString, IsEmail, IsOptional, IsEnum } from 'class-validator';

export class UserDto {
  public id: number;
  public email: string;
  public name: string;
  public role: UserRole;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  public name?: string;

  @IsEmail()
  @IsOptional()
  public email?: string;

  @IsEnum(UserRole)
  @IsOptional()
  public role?: UserRole;
}
