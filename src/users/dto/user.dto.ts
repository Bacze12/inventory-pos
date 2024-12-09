import { UserRole } from '@prisma/client';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsEnum,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  public id: number;

  @ApiProperty()
  public email: string;

  @ApiProperty()
  public name: string;

  @ApiProperty({ enum: UserRole })
  public role: UserRole;

  @ApiProperty({ example: true })
  public isActive: boolean;

  @ApiProperty()
  public createdAt: Date;

  @ApiProperty()
  public updatedAt: Date;
}

export class UpdateUserDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  public name?: string;

  @ApiProperty({ required: false })
  @IsEmail()
  @IsOptional()
  public email?: string;

  @ApiProperty({ required: false, enum: UserRole })
  @IsEnum(UserRole)
  @IsOptional()
  public role?: UserRole;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  public isActive?: boolean;
}
