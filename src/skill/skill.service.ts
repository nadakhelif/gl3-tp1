import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randEmail, randFullName, randSkill } from '@ngneat/falso';
import { Skill } from './entities/skill.entity';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(Skill)
    private skillRepository: Repository<Skill>,
  ) {}
  async createMultiple() {
    for (let i = 0; i < 10; i++) {
      const skill = new Skill();
      skill.designation = randSkill();
      await this.skillRepository.save(skill);
    }
  }
  async create(createSkillDto: CreateSkillDto) {
    return await this.skillRepository.save(createSkillDto);
  }

  findAll() {
    return `This action returns all skill`;
  }

  async findOne(id: number) {
    return await this.skillRepository.findOne({ where: { id: id } });
  }

  update(id: number, updateSkillDto: UpdateSkillDto) {
    return `This action updates a #${id} skill`;
  }

  remove(id: number) {
    return `This action removes a #${id} skill`;
  }
}
