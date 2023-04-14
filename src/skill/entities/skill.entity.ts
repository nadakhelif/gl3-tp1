import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cv } from '../../cv/entities/cv.entity';
@Entity('skill')
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  designation: string;

  @ManyToMany((type) => Cv, (cv: Cv) => cv.skills)
  @JoinTable()
  cvs: Cv[];
}
