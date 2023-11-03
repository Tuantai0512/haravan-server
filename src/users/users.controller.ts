import { Body, Controller, Get, Post, Param, Delete, Put, Res, Req, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginForm, Password, UserDto } from './users.dto';
import { Response, Request } from 'express';
import { JwtService } from '@nestjs/jwt';

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

  @Post('auth')
  async auth(@Req() req: Request): Promise<UserDto>{
    try{
      const cookie = req.cookies['jwt'];

      const data = await this.jwtService.verifyAsync(cookie);

      if(!data){
        throw new UnauthorizedException()
      }

      const user = await this.usersService.findOne(data['id'])

      return user;

    }catch(e){
      throw new UnauthorizedException()
    }
  }

  @Post('login')
  async login(@Body() loginForm: LoginForm, @Res({ passthrough: true }) res: Response): Promise<{ message: string }> {

    const payload = await this.usersService.login(loginForm);

    const token = await this.jwtService.signAsync(payload);

    res.cookie('jwt', token, { httpOnly: true });

    return {
      message: 'Login success'
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
}