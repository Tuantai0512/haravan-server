import { BadRequestException, Injectable } from "@nestjs/common";
import { CartDetail } from "./cartDetail.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CartDetailDto } from "./cartDetail.dto";
import { CartService } from "src/cart/cart.service";
import { ProductService } from "src/product/product.service";

@Injectable()
export class CartDetailService {
    constructor(
        @InjectRepository(CartDetail)
        private readonly cartDetailRepository: Repository<CartDetail>,
        private readonly cartService: CartService,
        private readonly productService: ProductService,
    ) { }

    async save(cartDetailDto: CartDetailDto): Promise<any> {
        const selectedCart = await this.cartService.findOne(cartDetailDto.cartId);
        if(selectedCart){
            const selectedProduct = await this.productService.findOne(cartDetailDto.productId);
            if(selectedProduct){
                const existedProduct = selectedCart.items.find((item) => item.product.id == cartDetailDto.productId)
                if(existedProduct){
                    return this.cartDetailRepository.update(existedProduct.id, { quantity: existedProduct.quantity + (cartDetailDto.quantity || 1)})
                }else{
                    const cartDetail = this.cartDetailRepository.create(cartDetailDto);
                    cartDetail.cart = selectedCart;
                    cartDetail.product = selectedProduct;
                    return this.cartDetailRepository.save(cartDetail);
                }
            }else{
                throw new BadRequestException({ message: `product isn't exist` })
            }
        }else{
            throw new BadRequestException({ message: `cart isn't exist` })
        }
    }

    async findAll(): Promise<CartDetail[]> {
        return this.cartDetailRepository.find({
            relations: {
                cart: true,
                product: true
            }
        });
    }

    async findOne(id: string): Promise<CartDetail> {
        return this.cartDetailRepository.findOne({
            where: { id },
            relations: {
                cart: true,
                product: true
            }
        });
    }

    async update(id: string, cartDto: CartDetail): Promise<any> {
        const result = await this.cartDetailRepository.update(id, cartDto);
        if (result.affected) {
            return { message: 'Category updated' };
        } else {
            throw new BadRequestException({ message: 'Category update failed' });
        }
    }

    async remove(id: string): Promise<any> {
        const result = await this.cartDetailRepository.delete(id);
        if (result.affected) {
            return { message: 'Category deleted' };
        } else {
            throw new BadRequestException({ message: 'Category delete failed' });
        }
    }
}