import { BaseEntity } from 'src/common/mysql/base.entity';
import { Product } from 'src/product/product.entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity({
  name: 'category'
})
export class Category extends BaseEntity {

  @Column()
  name: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[]

}