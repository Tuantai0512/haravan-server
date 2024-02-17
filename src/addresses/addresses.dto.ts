import { Expose } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsPhoneNumber, IsString, ValidateIf } from "class-validator";
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

    @ValidateIf((obj) => obj.phoneNumber !== null && obj.phoneNumber !== '')
    @IsPhoneNumber(null, {message : 'phoneNumber must be a valid phone number, example: +(CountryCode) .....'})
    @Expose()
    phoneNumber?: string | null;

    @Expose()
    @IsBoolean()
    default: boolean;

    @Expose()
    user: UserDto;
}