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

    async save(userId: string,addressDto: AddressesDto): Promise<AddressesDto> {
        const user = await this.userService.findOne(userId);

        if (user) {
            if(addressDto.default){
                const allAddress = await this.userService.findAllAddressById(userId);
                const defaultAddress = allAddress.addresses.find(address => address.default);
                if(defaultAddress){
                    const undefaultAddress = this.addressesRepository.create(defaultAddress);
                    undefaultAddress.default = false;
                    await this.addressesRepository.update(defaultAddress.id, undefaultAddress);
                };
            }

            const address = this.addressesRepository.create(addressDto);
            address.user = user;

            const saveAddress = await this.addressesRepository.save(address);
            return plainToInstance(AddressesDto, saveAddress, {
                excludeExtraneousValues: true
            })
        } else {
            throw new BadRequestException({ message: `User isn't exist` })
        }
    }

    async update(id: string, userId: string, addressDto: AddressesDto): Promise<{ message: string }> {
        if(addressDto.default){
            const allAddress = await this.userService.findAllAddressById(userId);
            const defaultAddress = allAddress.addresses.find(address => address.default);
            if(defaultAddress){
                const undefaultAddress = this.addressesRepository.create(defaultAddress);
                undefaultAddress.default = false;
                await this.addressesRepository.update(defaultAddress.id, undefaultAddress);
            };
        }else{
            const allAddress = await this.userService.findAllAddressById(userId);
            const defaultAddress = allAddress.addresses.find(address => address.default);
            if(defaultAddress){
                if(defaultAddress.id === id){
                    addressDto.default = true;
                };
            };
        }

        const changeAddress = this.addressesRepository.create(addressDto);
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
            return { message: 'Deleted address' };
        } else {
            throw new BadRequestException({ message: 'Email delete failed' }) ;
        }
    }
    
    getAllAddress(userId: string) {
        return this.userService.findAllAddressById(userId);
    }
}