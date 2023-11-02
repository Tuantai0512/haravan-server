import { Body, Controller, Get, Post, Param, Delete, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginForm, Password, UserDto } from './users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  async selectAll(): Promise<UserDto[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  findEmail(@Param('id') id: string): Promise<UserDto> {
    return this.usersService.findOne(id);
  }

  @Post('login')
  login(@Body() loginForm: LoginForm): Promise<UserDto> {
    return this.usersService.login(loginForm);
  }

  @Post('register')
  register(@Body() user: UserDto): Promise<UserDto | {message: string}> {
    return this.usersService.save(user);
  }

  @Put(':id')
  changePasswordUser(@Param('id') id: string, @Body() password: Password): Promise<{message: string}> {
    return this.usersService.changePassword(id, password);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): Promise<{message: string}> {
    return this.usersService.remove(id);
  }
}