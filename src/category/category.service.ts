import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./category.entity";
import { Repository } from "typeorm";
import { CategoryDto } from "./category.dto";


@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) { }

    async save(categoryDto: CategoryDto): Promise<any> {
        const selectedCategory = await this.categoryRepository.findOneBy({ name: categoryDto.name });
        if (selectedCategory) {
            throw new BadRequestException({ message: 'Categogy is exists' })
        } else {
            return this.categoryRepository.save({ name: categoryDto.name })
        }
    }

    async findAll(): Promise<any> {
        return this.categoryRepository.find();
    }

    async update(id: string, categoryDto: CategoryDto): Promise<any> {
        const result = await this.categoryRepository.update(id, categoryDto);
        if (result.affected) {
            return { message: 'Category updated' };
        } else {
            throw new BadRequestException({ message: 'Category update failed' });
        }
    }

    async remove(id: string): Promise<any> {
        const result = await this.categoryRepository.delete(id);
        if (result.affected) {
            return { message: 'Category deleted' };
        } else {
            throw new BadRequestException({ message: 'Category delete failed' });
        }
    }
}