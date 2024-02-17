import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { BaseDto } from "src/common/mysql/base.dto";

export class CartDetailDto extends BaseDto {

    @Expose()
    @IsNotEmpty()
    cartId: string;

    @Expose()
    @IsNotEmpty()
    productId: string;

    @Expose()
    price: number;

    @Expose()
    quantity: number;

    @Expose()
    total: number;
}