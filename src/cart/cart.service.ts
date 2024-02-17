import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Cart } from "./cart.entity";
import { Repository } from "typeorm";
import { CartDto } from "./cart.dto";

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Cart)
        private readonly cartRepository: Repository<Cart>,
    ) { }

    async save(cartDto: CartDto): Promise<Cart> {
        return this.cartRepository.save(cartDto);
    }

    async findAll(): Promise<any> {
        return this.cartRepository.find({
            relations: {
                items: {
                    product: {
                        galery: true
                    }
                }
            }
        });
    }

    async findOne(id: string): Promise<Cart> {
        return this.cartRepository.findOne({
            where: { id },
            relations: {
                items: {
                    product: {
                        galery: true
                    }
                }
            }
        });
    }

    async update(id: string, cartDto: CartDto): Promise<any> {
        const result = await this.cartRepository.update(id, cartDto);
        if (result.affected) {
            return { message: 'Category updated' };
        } else {
            throw new BadRequestException({ message: 'Category update failed' });
        }
    }

    async remove(id: string): Promise<any> {
        const result = await this.cartRepository.delete(id);
        if (result.affected) {
            return { message: 'Category deleted' };
        } else {
            throw new BadRequestException({ message: 'Category delete failed' });
        }
    }
}