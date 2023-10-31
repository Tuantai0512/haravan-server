import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { UserDto } from './users.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async save(userDto: UserDto): Promise<UserDto> {
    const savedUser = await this.usersRepository.save(userDto);
    return plainToInstance(UserDto, savedUser, {
      excludeExtraneousValues: true
    })
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

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}