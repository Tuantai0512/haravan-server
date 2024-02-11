import { Expose } from "class-transformer";
import { IsNotEmpty, Min } from "class-validator";

export class CreateProductDto {

    @Expose()
    @IsNotEmpty()
    title: string;

    @Expose()
    @IsNotEmpty()
    @Min(0)
    price: number;

    @Expose()
    @Min(0)
    discount: number;

    @Expose()
    @IsNotEmpty()
    description: string;

    @Expose()
    @IsNotEmpty()
    categoryId: string;
}