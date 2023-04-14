import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Skill } from '../../skill/entities/skill.entity';
@Entity('cv')
export class Cv {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  firstname: string;
  @Column()
  age: number;
  @Column()
  cin: string;
  @Column()
  job: string;
  @Column()
  path: string;
  @ManyToOne(() => User, (user: User) => user.cvs)
  user: User;
  @ManyToMany((type) => Skill, (skill) => skill.cvs)
  @JoinTable({
    name: 'cv_skills',
    joinColumn: {
      name: 'cv',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'skill',
      referencedColumnName: 'id',
    },
  })
  skills: Skill[];
}
