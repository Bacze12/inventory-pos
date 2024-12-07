
import { Role } from 'src/constants/roles';
import { IsString, IsEmail, IsOptional } from 'class-validator';
export class UserDto {
  id: number;
  email: string;
  name: string;
  role: Role;
}

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    role?: Role;

}
