import { BadRequestException, Injectable } from "@nestjs/common";
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

    async save(addressDto: AddressesDto): Promise<AddressesDto> {
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
            throw new BadRequestException({ message: 'create address failed' })
        }
    }

    async update(id: string, addressDto: AddressesDto): Promise<{ message: string }> {
        if(addressDto.default){
            const allAddress = await this.userService.findAllAddressById(addressDto.userId);
            const defaultAddress = allAddress.addresses.find(address => address.default);
            const undefaultAddress = this.addressesRepository.create(defaultAddress);
            undefaultAddress.default = false;
            await this.addressesRepository.update(defaultAddress.id, undefaultAddress);
        }

        const {userId, ...rest} = addressDto;
        const changeAddress = this.addressesRepository.create(rest);
        const result =  await this.addressesRepository.update(id, changeAddress);
        if (result.affected) {
            return { message: 'Updated Address' };
        } else {
            throw new BadRequestException({ message: 'Update address failed' }) ;
        }
    }

    async remove(id: string): Promise<{ message: string }> {
        const result = await this.addressesRepository.delete(id);
        if (result.affected) {
            return { message: 'Email delete succeed' };
        } else {
            throw new BadRequestException({ message: 'Email delete failed' }) ;
        }
    }
    
    getAllAddress(id: string) {
        return this.userService.findAllAddressById(id);
    }
}