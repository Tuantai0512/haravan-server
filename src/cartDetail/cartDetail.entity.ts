import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { BaseEntity } from 'src/common/mysql/base.entity';
import { Cart } from "src/cart/cart.entity";
import { Product } from "src/product/product.entity";

@Entity({
    name: 'cart-detail'
})
export class CartDetail extends BaseEntity {

    @ManyToOne(() => Cart, (cart) => cart.items)
    cart: Cart;

    @OneToOne(() => Product)
    @JoinColumn()
    product: Product;

    @Column({nullable: true})
    price: number;

    @Column({default: 1})
    quantity: number;

    @Column({nullable: true})
    total: number;
}