import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { Product } from "./product.entity";
import { UpdateProductDto } from "./dto/update-product.dto";

@Controller('product')
export class ProductController {
    constructor(
        private readonly productService: ProductService,
    ) { }

    @Get()
    async allCategory(): Promise<Product[]>{
        return this.productService.findAll();
    }

    @Get(':id')
    async selectCategory(@Param('id') id: string): Promise<any>{
        return this.productService.findOne(id);
    }

    @Post()
    async create(@Body() productDto: CreateProductDto): Promise<Product>{
        return this.productService.save(productDto);
    }

    @Put()
    async update(@Body() productDto: UpdateProductDto): Promise<any>{
        return this.productService.update(productDto);
    }

    @Delete(':id')
    async removeCategory(@Param('id') id: string): Promise<any>{
        return this.productService.remove(id);
    }
}