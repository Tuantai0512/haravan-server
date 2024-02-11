import { Expose } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";
import { BaseDto } from "src/common/mysql/base.dto";
import { Country, Province } from "./addresses.entity";
import { UserDto } from "src/users/users.dto";
import { DoesNotContainSpecialCharacter } from "src/common/decorator/checkSpecialCharacter";

export class AddressesDto extends BaseDto {

    @DoesNotContainSpecialCharacter()
    @IsNotEmpty()
    @IsString()
    @Expose()
    firstName: string;

    @DoesNotContainSpecialCharacter()
    @IsNotEmpty()
    @IsString()
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

    @IsPhoneNumber()
    @Expose()
    phoneNumber: string;

    @Expose()
    @IsBoolean()
    default: boolean;

    @Expose()
    user: UserDto;
}