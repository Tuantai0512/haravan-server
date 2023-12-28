import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { UsersModule } from './users/users.module';
import { AddressesModule } from './addresses/addresses.module';
import { Address } from './addresses/addresses.entity';
import { Category } from './category/category.entity';
import { Product } from './product/product.entity';
import { CategoryModule } from './category/category.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3307,
        username: 'root',
        password: '123456',
        database: 'haravan-store',
        entities: [User, Address, Category, Product],
        synchronize: true,
      }),
    UsersModule,
    AddressesModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}