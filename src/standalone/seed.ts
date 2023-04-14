import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import {
  randDirectoryPath,
  randEmail,
  randFirstName,
  randFullName,
  randJobTitle,
  randLastName,
  randNumber,
  randSkill,
  randUserName,
} from '@ngneat/falso';
import { UserService } from '../user/user.service';
import { CvService } from '../cv/cv.service';
import { SkillService } from '../skill/skill.service';
import { User } from '../user/entities/user.entity';
import { Skill } from '../skill/entities/skill.entity';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const userService: UserService = app.get(UserService);
  const cvService: CvService = app.get(CvService);
  const skillService: SkillService = app.get(SkillService);

  for (let i = 0; i < 9; i++) {
    const user = new User();
    user.email = randEmail();
    user.username = randFullName();
    const randomstring = Math.random().toString(36).slice(-8);
    user.password = randomstring;
    await userService.create(user);

    const skill = new Skill();
    skill.designation = randSkill();
    await skillService.create(skill);
  }

  const users = await userService.findAll();

  for (const user of users) {
    const cv = {
      name: randLastName(),
      firstname: randFirstName(),
      age: randNumber({ min: 16, max: 60 }),
      cin: randNumber({ min: 1400000, max: 16000000 }),
      job: randJobTitle(),
      path: randDirectoryPath(),
      user: user,
      skills: [],
    };
    await cvService.create(cv);
  }

  const cvs = await cvService.findAll();

  for (const cv of cvs) {
    const index = Math.floor(Math.random() * 10) + 1;
    cv.skills = [];
    cv.skills.push(await skillService.findOne(index));
    await cvService.create(cv);
  }
}
bootstrap();
