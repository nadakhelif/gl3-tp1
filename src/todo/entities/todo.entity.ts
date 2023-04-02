import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Time } from './Time.entity';
import { TodoStatusEnum } from './todostatusEnum';

@Entity('todo')
export class TodoEntity extends Time {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  description: string;

  @Column()
  status: TodoStatusEnum;
}
