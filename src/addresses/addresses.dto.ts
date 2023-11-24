import { Expose } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";
import { BaseDto } from "src/common/mysql/base.dto";
import { Country, Province } from "./addresses.entity";
import { UserDto } from "src/users/users.dto";


export class AddressesDto extends BaseDto {

    @IsNotEmpty()
    @Expose()
    userId: string;

    @IsNotEmpty()
    @Expose()
    firstName: string;

    @IsNotEmpty()
    @Expose()
    lastName: string;

    @Expose()
    company: string;

    @Expose()
    address1: string;

    @Expose()
    address2: string;

    @Expose()
    country: Country;

    @Expose()
    province: Province;

    @Expose()
    default: boolean;

    @Expose()
    user: UserDto;
}