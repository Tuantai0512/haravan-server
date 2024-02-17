import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CartDetailService } from "./cartDetail.service";
import { CartDetailDto } from "./cartDetail.dto";
import { CartDetail } from "./cartDetail.entity";

@Controller('cart-detail')
export class CartDetailController {
    constructor(
        private readonly cartDetailService: CartDetailService,
    ) { }

    @Get()
    async allCategory(): Promise<CartDetail[]>{
        return this.cartDetailService.findAll();
    }

    @Get(':id')
    async selectCategory(@Param('id') id: string): Promise<CartDetail>{
        return this.cartDetailService.findOne(id);
    }

    @Post()
    async create(@Body() CartDetailDto: CartDetailDto): Promise<CartDetail>{
        return this.cartDetailService.save(CartDetailDto);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() cartDetailDto: CartDetailDto): Promise<any>{
        return this.cartDetailService.update(id, cartDetailDto);
    }

    @Delete(':id')
    async removeCategory(@Param('id') id: string): Promise<any>{
        return this.cartDetailService.remove(id);
    }
}