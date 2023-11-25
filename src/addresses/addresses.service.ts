import { Injectable } from "@nestjs/common";
import { Address } from "./addresses.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { AddressesDto } from "./addresses.dto";
import { UsersService } from "src/users/users.service";
import { plainToInstance } from "class-transformer";

@Injectable()
export class AddressesService {
    constructor(
        @InjectRepository(Address)
        private readonly addressesRepository: Repository<Address>,
        private readonly userService: UsersService
    ) { }

    async save(addressDto: AddressesDto): Promise<AddressesDto | { message: string }> {
        const user = await this.userService.findOne(addressDto.userId);

        if (user) {
            const { userId, ...rest } = addressDto;
            const address = this.addressesRepository.create(rest);
            address.user = user;

            const saveAddress = await this.addressesRepository.save(address);
            return plainToInstance(AddressesDto, saveAddress, {
                excludeExtraneousValues: true
            })
        } else {
            return { message: 'create address failed' }
        }
    }

    async remove(id: string): Promise<{ message: string }> {
        const result = await this.addressesRepository.delete(id);
        if (result.affected) {
            return { message: 'Email delete succeed' };
        } else {
            return { message: 'Email delete failed' };
        }
    }
    
    getAllAddress(id: string) {
        return this.userService.findAllAddressById(id);
    }
}