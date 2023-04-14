import { Injectable } from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  randCurrencyCode,
  randFilePath,
  randFirstName,
  randJobTitle,
  randNumber,
  randSkill,
} from '@ngneat/falso';
import { Cv } from './entities/cv.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(Cv)
    private cvRepository: Repository<Cv>,
    private userService: UserService,
  ) {}
  async createMultiple() {
    for (let i = 0; i < 10; i++) {
      const cv = new Cv();
      cv.name = randFirstName();
      cv.firstname = randFirstName();
      cv.cin = randCurrencyCode();
      cv.age = randNumber();
      cv.job = randJobTitle();
      cv.path = randFilePath();

      cv.user = await this.userService.findOne(Math.random() * (10 - 1) + 1);
      await this.cvRepository.save(cv);
    }
  }

  async create(createCvDto: CreateCvDto) {
    return await this.cvRepository.save(createCvDto);
  }

  async findAll() {
    return await this.cvRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} cv`;
  }

  update(id: number, updateCvDto: UpdateCvDto) {
    return `This action updates a #${id} cv`;
  }

  remove(id: number) {
    return `This action removes a #${id} cv`;
  }
}
