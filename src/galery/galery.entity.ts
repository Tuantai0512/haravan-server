import { BeforeInsert, Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from 'src/common/mysql/base.entity';
import { Product } from "src/product/product.entity";
import { IsBoolean } from "class-validator";

@Entity({
    name: 'galery'
})
export class Galery extends BaseEntity {

    @Column()
    name: string;

    @Column()
    fileName: string;

    @Column()
    mimeType: string;

    @Column()
    size: number;

    @Column()
    key: string;

    @Column("longtext")
    url: string;

    @Column({default: false})
    @IsBoolean()
    avatar: boolean;

    @ManyToOne(() => Product, (product) => product.galery)
    product: Product;
}