import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { BaseDto } from "src/common/mysql/base.dto";

export class CategoryDto extends BaseDto {

    @Expose()
    @IsNotEmpty()
    name: string;

}