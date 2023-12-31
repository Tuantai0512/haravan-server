import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { LoginForm, Password, UserDto } from './users.dto';
import { plainToInstance } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { Address } from 'src/addresses/addresses.entity';

const saltOrRounds = 12;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) { }

  async save(userDto: UserDto): Promise<UserDto | { message: string }> {
    const hashedPassword = await bcrypt.hash(userDto.password, saltOrRounds);
    const selectedUser = await this.usersRepository.findOneBy({ email: userDto.email });
    if (selectedUser) {
      throw new BadRequestException({ message: 'Email already exists' })
    } else {
      const savedUser = await this.usersRepository.save({ ...userDto, password: hashedPassword });
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

  async login(loginForm: LoginForm): Promise<{ id: string, email: string }> {
    const selectedUser = await this.usersRepository.findOneBy({ email: loginForm.email })

    if ((!selectedUser) || (!await bcrypt.compare(loginForm.password, selectedUser.password))) {
      throw new BadRequestException('invalid credentials');
    }

    return { id: selectedUser.id, email: selectedUser.email }
  }

  async changePassword(id: string, password: Password): Promise<{ message: string }> {
    password.password = await bcrypt.hash(password.password, saltOrRounds)
    const result = await this.usersRepository.update(id, password);
    if (result.affected) {
      return { message: 'Change password succeed' };
    } else {
      throw new BadRequestException({ message: 'Change password failed' });
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.usersRepository.softDelete(id);
    if (result.affected) {
      return { message: 'Email delete succeed' };
    } else {
      throw new BadRequestException({ message: 'Email delete failed' });
    }
  }

  async restore(id: string): Promise<{ message: string }> {
    const result = await this.usersRepository.restore(id);
    if (result.affected) {
      return { message: 'Email restored' };
    } else {
      throw new BadRequestException({ message: 'Email restore failed' });
    }
  }

  async findAllAddressById(id: string): Promise<{email: string,addresses: Address[]}> {
    const addresses = await this.usersRepository
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.addresses", "address")
      .where('user.id = :userId', { userId: id })
      .getOne()
    if (!addresses) {
      throw new BadRequestException();
    }

    return {
      email: addresses.email,
      addresses: addresses.addresses
    }
  }
}