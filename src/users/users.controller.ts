import { Body, Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  async selectAll(): Promise<UserDto[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  selectOne(@Param('id') id: string): Promise<UserDto> {
    return this.usersService.findOne(id);
  }

  @Post()
  createUser(@Body() user: UserDto): Promise<UserDto | object> {
    return this.usersService.save(user);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}