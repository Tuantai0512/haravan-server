import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class CreateProductDto {

    @Expose()
    @IsNotEmpty()
    title: string;

    @Expose()
    @IsNotEmpty()
    price: number;

    @Expose()
    discount: number;

    @Expose()
    @IsNotEmpty()
    description: string;

    @Expose()
    @IsNotEmpty()
    categoryId: string;
}