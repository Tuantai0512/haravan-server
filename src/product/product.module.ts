import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./product.entity";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { CategoryModule } from "src/category/category.module";


@Module({
    imports: [
        TypeOrmModule.forFeature([Product]),
        CategoryModule,
    ],
    providers: [ProductService],
    controllers: [ProductController],
    exports: [ ProductService ]
})
export class ProductModule { }