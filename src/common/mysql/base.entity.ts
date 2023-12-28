import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @CreateDateColumn({
        name: 'createdAt'
    })
    createdAt: string;

    @UpdateDateColumn({
        name: 'updatedAt'
    })
    updatedAt: string;

}