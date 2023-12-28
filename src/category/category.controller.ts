import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CategoryDto } from "./category.dto";

@Controller('category')
export class CategoryController {
    constructor(
        private readonly addressesService: CategoryService,
    ) { }

    @Get()
    async allCategory(): Promise<any>{
        return this.addressesService.findAll();
    }

    @Post()
    async create(@Body() CategoryDto: CategoryDto): Promise<any>{
        return this.addressesService.save(CategoryDto);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() categoryDto: CategoryDto): Promise<any>{
        return this.addressesService.update(id, categoryDto);
    }

    @Delete(':id')
    async removeCategory(@Param('id') id: string): Promise<any>{
        return this.addressesService.remove(id);
    }
}