import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { BaseDto } from "src/common/mysql/base.dto";

export class UpdateProductDto {

    @Expose()
    @IsNotEmpty()
    id: string;
    
    @Expose()
    title: string;

    @Expose()
    price: number;

    @Expose()
    discount: number;

    @Expose()
    description: string;

    @Expose()
    categoryId: string;
}