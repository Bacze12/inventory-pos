import { Role } from 'src/constants/roles';
import { IsString, IsEmail, IsOptional } from 'class-validator';
export class UserDto {
  public id: number;
  public email: string;
  public name: string;
  public role: Role;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  public name?: string;

  @IsEmail()
  @IsOptional()
  public email?: string;

  @IsString()
  @IsOptional()
  public role?: Role;
}
