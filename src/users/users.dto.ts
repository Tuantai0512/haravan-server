
import { Expose, Exclude } from "class-transformer";
import { UserRole } from "./users.entity";
import { IsNotEmpty, Length, IsEmail } from "class-validator";

export class UserDto {
    @Expose()
    id: string;

    @IsNotEmpty()
    @IsEmail()
    @Expose()
    email: string;

    @IsNotEmpty()
    @Length(8)
    password: string;

    @Expose()
    role: UserRole;
}