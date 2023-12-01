import { Controller, Get, Post, Body, Param, Delete } from "@nestjs/common";
import { AddressesService } from "./addresses.service";
import { AddressesDto } from "./addresses.dto";
import { Address } from "./addresses.entity";

@Controller('addresses')
export class AddressesController {
    constructor(
        private readonly addressesService: AddressesService,
    ) { }

    @Post()
    async createAddress(@Body() addressesDto: AddressesDto): Promise<any> {
        return this.addressesService.save(addressesDto);
    }

    @Delete(':id')
    async deleteAddress(@Param('id') id: string): Promise<{ message: string }> {
        return this.addressesService.remove(id);
    }

    @Get(':id')
    async getAllAddress(@Param('id') id: string): Promise<{email: string,addresses: Address[]} | {message : string}>{
        return this.addressesService.getAllAddress(id);
    }
}