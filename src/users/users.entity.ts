import { Address } from 'src/addresses/addresses.entity';
import { BaseEntity } from 'src/common/mysql/base.entity';
import { Entity, Column, OneToMany } from 'typeorm';

export enum UserRole {
  ADMIN = "admin",
  GUEST = "guest"
}

@Entity({
  name: 'users'
})
export class User extends BaseEntity {

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.GUEST
  })
  role: UserRole;

  @OneToMany(() => Address, (photo) => photo.user)
  addresses: Address[]
}