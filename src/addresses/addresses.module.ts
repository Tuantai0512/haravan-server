import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressesController } from './addresses.controller';
import { Address } from './addresses.entity';
import { AddressesService } from './addresses.service';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Address]),
        UsersModule
    ],
    providers: [AddressesService],
    controllers: [AddressesController],
})
export class AddressesModule { }