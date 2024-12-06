import { IsEmail, IsString, IsNotEmpty, MinLength } from "class-validator";
import { Role } from "src/constants/roles";
import { IsValidRole } from "src/common/decorators/roles.decorator";

export class CreateAuthDto {
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @IsValidRole()
    role: Role;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;
}