import { Expose } from "class-transformer";
import { IsNotEmpty, Min } from "class-validator";
import { BaseDto } from "src/common/mysql/base.dto";

export class UpdateProductDto {

    @Expose()
    @IsNotEmpty()
    id: string;
    
    @Expose()
    title: string;

    @Expose()
    @Min(0)
    price: number;

    @Expose()
    @Min(0)
    discount: number;

    @Expose()
    description: string;

    @Expose()
    categoryId: string;
}