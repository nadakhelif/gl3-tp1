import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { CommonModule } from '../common/common.module';
import { TodoEntity } from './entities/todo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [TodoController],
  providers: [TodoService],
  imports: [CommonModule, TypeOrmModule.forFeature([TodoEntity])],
})
export class TodoModule {}
