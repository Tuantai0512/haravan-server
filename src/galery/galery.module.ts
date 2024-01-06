import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GaleryService } from "./galery.service";
import { Galery } from "./galery.entity";
import { ConfigModule } from "@nestjs/config";
import { GaleryController } from "./galery.controller";
import { ProductModule } from "src/product/product.module";


@Module({
    imports: [
        TypeOrmModule.forFeature([Galery]),
        ProductModule,
        ConfigModule
    ],
    providers: [GaleryService],
    controllers: [GaleryController],
})
export class GaleryModule { }