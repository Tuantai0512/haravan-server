import { Country, Province } from "src/addresses/addresses.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from 'src/common/mysql/base.entity';
import { CartDetail } from "src/cartDetail/cartDetail.entity";

export enum CartStatus {
    pending = 'pending',
    approved = 'approved'
}

@Entity({
    name: 'cart'
})
export class Cart extends BaseEntity {

    @Column({nullable: true})
    fullName: string;

    @Column({nullable: true})
    email: string;

    @Column({nullable: true})
    phoneNumber: string;

    @Column({nullable: true})
    address: string;

    @Column({
        type: 'enum',
        enum: Country,
        default: Country.VN
    })
    country: Country;

    @Column({
        type: 'enum',
        enum: Province,
        default: Province.VN_HoChiMinh
    })
    province: Province;

    @Column({nullable: true})
    shipping: string;
    
    @Column({nullable: true})
    payment: string;

    @OneToMany(() => CartDetail, (detail) => detail.cart)
    items: CartDetail[]

    @Column({nullable: true})
    total: number;

    @Column({
        type: 'enum',
        enum: CartStatus,
        default: CartStatus.pending
    })
    status: CartStatus
}