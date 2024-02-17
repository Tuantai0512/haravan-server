import { Expose } from "class-transformer";
import { IsEmail, IsPhoneNumber, ValidateIf } from "class-validator";
import { Country, Province } from "src/addresses/addresses.entity";
import { DoesNotContainSpecialCharacter } from "src/common/decorator/checkSpecialCharacter";
import { BaseDto } from "src/common/mysql/base.dto";
import { CartStatus } from "./cart.entity";

export class CartDto extends BaseDto {

    @ValidateIf((obj) => obj.fullName !== null && obj.fullName !== '')
    @DoesNotContainSpecialCharacter()
    @Expose()
    fullName: string | null;

    @ValidateIf((obj) => obj.email !== null && obj.email !== '')
    @IsEmail()
    @Expose()
    email?: string | null;

    @ValidateIf((obj) => obj.phoneNumber !== null && obj.phoneNumber !== '')
    @IsPhoneNumber(null, {message : 'phoneNumber must be a valid phone number, example: +(CountryCode) .....'})
    @Expose()
    phoneNumber?: string | null;

    @Expose()
    address: string;

    @Expose()
    country: Country;

    @Expose()
    province: Province;

    @Expose()
    payment: string;
    
    @Expose()
    total: number;

    @Expose()
    status: CartStatus;
}