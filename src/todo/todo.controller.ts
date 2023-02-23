import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TodoModel } from './todo.model';
import { TodoCreate } from './DTO/todo-create.dto';
import { TodoUpdate } from './DTO/todo-update.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  private todos: TodoModel[] = [];
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getTodos(): TodoModel[] {
    return this.todoService.all();
  }

  @Post()
  createTodo(@Body() body: TodoCreate): TodoModel {
    return this.todoService.create(body);
  }

  @Get('/:id')
  getTodoById(@Param() params) {
    const id = params.id;
    return this.todoService.getById(id);
  }

  @Delete('/:id')
  deleteTodoById(@Param() params) {
    const id = params.id;
    return this.todoService.deleteById(id);
  }

  @Put('/:id')
  updateTodoById(@Param() params, @Body() updateTodo: TodoUpdate) {
    const id = params.id;
    return this.todoService.updateById(id, updateTodo);
  }
}
