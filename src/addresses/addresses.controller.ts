import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Req } from "@nestjs/common";
import { AddressesService } from "./addresses.service";
import { AddressesDto } from "./addresses.dto";
import { Address } from "./addresses.entity";
import { AuthGuard } from "src/common/guard/authentication";

@Controller('addresses')
export class AddressesController {
    constructor(
        private readonly addressesService: AddressesService,
    ) { }

    @UseGuards(AuthGuard)
    @Get()
    async getAllAddress(@Req() req): Promise<{ email: string, addresses: Address[] } | { message: string }> {
        return this.addressesService.getAllAddress(req.user.id);
    }

    @UseGuards(AuthGuard)
    @Post()
    async createAddress(@Req() req, @Body() addressesDto: AddressesDto): Promise<AddressesDto> {
        return this.addressesService.save(req.user.id, addressesDto);
    }

    @UseGuards(AuthGuard)
    @Put(':id')
    async updateAddress(@Req() req, @Param('id') id: string, @Body() addressesDto: AddressesDto): Promise<any> {
        return this.addressesService.update(id, req.user.id, addressesDto);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async deleteAddress(@Req() req, @Param('id') id: string): Promise<{ message: string }> {
        return this.addressesService.remove(id);
    }

}