import { Expose } from "class-transformer";
import { UserRole } from "./users.entity";
import { IsNotEmpty, Length, IsEmail } from "class-validator";
import { BaseDto } from "src/common/mysql/base.dto";

export class UserDto extends BaseDto {

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

export class Password {
    @IsNotEmpty()
    password: string;
}