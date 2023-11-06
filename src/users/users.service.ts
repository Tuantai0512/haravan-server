import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { LoginForm, Password, UserDto } from './users.dto';
import { plainToInstance } from 'class-transformer';
import * as bcrypt from 'bcrypt';

const saltOrRounds = 12;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) { }

  async save(userDto: UserDto): Promise<UserDto | {message: string}> {
    const hashedPassword = await bcrypt.hash(userDto.password, saltOrRounds);
    const selectedUser = await this.usersRepository.findOneBy({ email: userDto.email });
    if (selectedUser) {
      return { message: 'Email already exists' }
    } else {
      const savedUser = await this.usersRepository.save({...userDto, password: hashedPassword});
      return plainToInstance(UserDto, savedUser, {
        excludeExtraneousValues: true
      })
    }
  }

  async findAll(): Promise<UserDto[]> {
    const allUser = await this.usersRepository.find();
    return plainToInstance(UserDto, allUser, {
      excludeExtraneousValues: true
    })
  }

  async findOne(id: string): Promise<UserDto | null> {
    const selectedUser = await this.usersRepository.findOneBy({ id });
    return plainToInstance(UserDto, selectedUser, {
      excludeExtraneousValues: true
    })
  }

  async login(loginForm: LoginForm): Promise<{id: string, email: string}>{
    const selectedUser = await this.usersRepository.findOneBy({ email: loginForm.email})

    if((!selectedUser) || (!await bcrypt.compare(loginForm.password, selectedUser.password))){
      throw new BadRequestException('invalid credentials');
    }

    return { id: selectedUser.id, email: selectedUser.email }
  }

  async changePassword(id: string, password: Password): Promise<{message: string}> {
    password.password = await bcrypt.hash(password.password, saltOrRounds)
    const result = await this.usersRepository.update(id, password);
    if(result.affected){
      return { message: 'Change password succeed'};
    }else{
      return { message: 'Change password failed'};
    }
  }

  async remove(id: string): Promise<{message: string}> {
    const result = await this.usersRepository.delete(id);
    if(result.affected){
      return { message: 'Email delete succeed'};
    }else{
      return { message: 'Email delete failed'};
    }
  }
}