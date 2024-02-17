import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CartService } from "./cart.service";
import { CartDto } from "./cart.dto";

@Controller('cart')
export class CartController {
    constructor(
        private readonly cartService: CartService,
    ) { }

    @Get()
    async allCategory(): Promise<any>{
        return this.cartService.findAll();
    }

    @Get(':id')
    async selectCategory(@Param('id') id: string): Promise<any>{
        return this.cartService.findOne(id);
    }

    @Post()
    async create(@Body() CartDto: CartDto): Promise<any>{
        return this.cartService.save(CartDto);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() cartDto: CartDto): Promise<any>{
        return this.cartService.update(id, cartDto);
    }

    @Delete(':id')
    async removeCategory(@Param('id') id: string): Promise<any>{
        return this.cartService.remove(id);
    }
}