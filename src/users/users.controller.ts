import { Body, Controller, Get, Post, Param, Delete, Put, Res, Req, UnauthorizedException, UseGuards, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginForm, Password, UserDto } from './users.dto';
import { Response, Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '../common/guard/authentication';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) { }

  @Get()
  async selectAll(): Promise<UserDto[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  findEmail(@Param('id') id: string): Promise<UserDto> {
    return this.usersService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Post('auth')
  getProfile(@Req() req) {
    return req.user;
  }

  @Post('login')
  async login(@Body() loginForm: LoginForm, @Res({ passthrough: true }) res: Response): Promise<{ access_token: string }> {

    const payload = await this.usersService.login(loginForm);

    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response){
    res.clearCookie('jwt');

    return {
      message: 'Logout success'
    }
  }

  @Post('register')
  register(@Body() user: UserDto): Promise<UserDto | { message: string }> {
    return this.usersService.save(user);
  }

  @Put(':id')
  changePasswordUser(@Param('id') id: string, @Body() password: Password): Promise<{ message: string }> {
    return this.usersService.changePassword(id, password);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): Promise<{ message: string }> {
    return this.usersService.remove(id);
  }

  @Patch('restore/:id')
  restoreUser(@Param('id') id:string): Promise<{ message: string }> {
    return this.usersService.restore(id);
  }
}