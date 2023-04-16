import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { randEmail, randFullName } from '@ngneat/falso';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  // async createMultiple() {
  //   for (let i = 0; i < 10; i++) {
  //     const user = new User();
  //     user.email = randEmail();
  //     user.username = randFullName();
  //     const randomstring = Math.random().toString(36).slice(-8);
  //     user.password = randomstring;
  //     await this.userRepository.save(user);
  //   }
  // }
  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({ where: { id: id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
