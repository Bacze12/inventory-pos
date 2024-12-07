import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';
import { Role } from 'src/constants/roles';
import { IsValidRole } from 'src/common/decorators/roles.decorator';

export class CreateAuthDto {
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsValidRole()
  public role: Role;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  public password: string;
}
