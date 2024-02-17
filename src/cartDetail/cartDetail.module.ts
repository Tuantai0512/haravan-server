import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CartDetail } from "./cartDetail.entity";
import { CartDetailService } from "./cartDetail.service";
import { CartDetailController } from "./cartDetail.controller";
import { CartModule } from "src/cart/cart.module";
import { Product } from "src/product/product.entity";
import { ProductModule } from "src/product/product.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([CartDetail]),
        CartModule,
        ProductModule
    ],
    providers: [CartDetailService],
    controllers: [CartDetailController],
    exports: [ CartDetailService ]
})
export class CartDetailModule { }