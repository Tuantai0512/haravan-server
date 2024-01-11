import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "./product.entity";
import { CreateProductDto } from "./dto/create-product.dto";
import { CategoryService } from "src/category/category.service";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Galery } from "src/galery/galery.entity";


@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        private readonly categoryService: CategoryService
    ) { }

    async save(productDto: CreateProductDto): Promise<Product> {
        const category = await this.categoryService.findOne(productDto.categoryId);

        if (category) {

            const product = this.productRepository.create(productDto);
            product.category = category;

            return this.productRepository.save(product);
        } else {
            throw new BadRequestException({ message: `Category isn't exist` })
        }
    }

    async findAll(): Promise<Product[]> {
        return this.productRepository.find({
            relations: {
                category: true,
                galery:true,
            },
            select:{
                category: {
                    name: true,
                },
            }
        });
    }

    async findOne(id: string): Promise<Product> {
        return this.productRepository.findOne({ 
            where: { id },
            relations: {
                category: true,
                galery:true,
            },
            select:{
                category: {
                    name: true,
                }
            } 
        });
    }

    async update(productDto: UpdateProductDto): Promise<any> {
        if(productDto.categoryId){
            const category = await this.categoryService.findOne(productDto.categoryId);
            if (category) {

                const product = this.productRepository.create(productDto);
                product.category = category;
    
                return this.productRepository.update(productDto.id, product);
            } else {
                throw new BadRequestException({ message: `Category isn't exist` })
            }
        }else{
            return this.productRepository.update(productDto.id, productDto);
        }
    }

    async remove(id: string): Promise<any> {
        const result = await this.productRepository.delete(id);
        if (result.affected) {
            return { message: 'Category deleted' };
        } else {
            throw new BadRequestException({ message: 'Category delete failed' });
        }
    }

    async findAllPhotoById(id: string): Promise<Galery[]> {
        const allPhoto = await this.productRepository
          .createQueryBuilder("product")
          .leftJoinAndSelect("product.galery", "galery")
          .where('product.id = :productId', { productId: id })
          .getOne()
        if (!allPhoto) {
          throw new BadRequestException();
        }
    
        return allPhoto.galery
    }
}