import { Controller, Get, Post, Body, Param, Delete, Put } from "@nestjs/common";
import { AddressesService } from "./addresses.service";
import { AddressesDto } from "./addresses.dto";
import { Address } from "./addresses.entity";

@Controller('addresses')
export class AddressesController {
    constructor(
        private readonly addressesService: AddressesService,
    ) { }

    @Get(':id')
    async getAllAddress(@Param('id') id: string): Promise<{ email: string, addresses: Address[] } | { message: string }> {
        return this.addressesService.getAllAddress(id);
    }

    @Post()
    async createAddress(@Body() addressesDto: AddressesDto): Promise<AddressesDto> {
        return this.addressesService.save(addressesDto);
    }

    @Put(':id')
    async updateAddress(@Param('id') id: string, @Body() addressesDto: AddressesDto): Promise<any> {
        return this.addressesService.update(id, addressesDto);
    }

    @Delete(':id')
    async deleteAddress(@Param('id') id: string): Promise<{ message: string }> {
        return this.addressesService.remove(id);
    }

}