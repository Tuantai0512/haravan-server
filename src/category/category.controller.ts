import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CategoryDto } from "./category.dto";

@Controller('category')
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService,
    ) { }

    @Get()
    async allCategory(): Promise<any>{
        return this.categoryService.findAll();
    }

    @Get(':id')
    async selectCategory(@Param('id') id: string): Promise<any>{
        return this.categoryService.findOne(id);
    }

    @Post()
    async create(@Body() CategoryDto: CategoryDto): Promise<any>{
        return this.categoryService.save(CategoryDto);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() categoryDto: CategoryDto): Promise<any>{
        return this.categoryService.update(id, categoryDto);
    }

    @Delete(':id')
    async removeCategory(@Param('id') id: string): Promise<any>{
        return this.categoryService.remove(id);
    }
}