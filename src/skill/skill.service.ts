import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randSkill } from '@ngneat/falso';
import { Skill } from './entities/skill.entity';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(Skill)
    private skillRepository: Repository<Skill>,
  ) {}
  // async createMultiple() {
  //   for (let i = 0; i < 10; i++) {
  //     const skill = new Skill();
  //     skill.designation = randSkill();
  //     await this.skillRepository.save(skill);
  //   }
  // }
  async create(createSkillDto: CreateSkillDto) {
    const skill = this.skillRepository.create(createSkillDto);
    return await this.skillRepository.save(skill);
  }

  async findAll() {
    return this.skillRepository.find();
  }

  async findOne(id: number) {
    return await this.skillRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateSkillDto: UpdateSkillDto) {
    const skill = await this.skillRepository.findOne({ where: { id: id } });
    if (!skill) {
      throw new NotFoundException('todo not found');
    } else {
      await this.skillRepository.update({ id }, updateSkillDto);
      return skill;
    }
  }

  async remove(id: number) {
    const skill = await this.skillRepository.findOne({ where: { id: id } });
    if (!skill) {
      throw new NotFoundException('todo not here ');
    }
    await this.skillRepository.delete(id);
    return { message: 'deleted todo success' };
  }
}
