import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressesController } from './addresses.controller';
import { Address } from './addresses.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Address]),
    ],
    providers: [AddressesController],
    controllers: [AddressesController],
})
export class AddressesModule { }