import { Category } from 'src/category/category.entity';
import { BaseEntity } from 'src/common/mysql/base.entity';
import { Entity, Column, DeleteDateColumn, ManyToOne } from 'typeorm';

@Entity({
    name: 'product'
})
export class Product extends BaseEntity {

    @Column()
    title: string;

    @Column()
    price: number;

    @Column()
    discount: number;

    @Column()
    thumbnail: string;

    @Column()
    description: string;

    @DeleteDateColumn({
        name: 'deletedAt'
    })
    deletedAt: string;

    @ManyToOne(() => Category, (category) => category.products)
    category: Category[]

}