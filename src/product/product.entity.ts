import { Category } from 'src/category/category.entity';
import { BaseEntity } from 'src/common/mysql/base.entity';
import { Galery } from 'src/galery/galery.entity';
import { Entity, Column, DeleteDateColumn, ManyToOne, OneToMany } from 'typeorm';

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

    @Column("longtext")
    description: string;

    @DeleteDateColumn({
        name: 'deletedAt'
    })
    deletedAt: string;

    @ManyToOne(() => Category, (category) => category.products)
    category: Category;

    @OneToMany(() => Galery, (galery) => galery.product)
    galery: Galery[]
}