import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TodoModel } from './todo.model';
import { TodoCreateDTO } from './DTO/todo-create.dto';
import { TodoUpdateDto } from './DTO/todo-update.dto';
import { TodoService } from './todo.service';
import { SearchDTO } from './DTO/search.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getTodos(): TodoModel[] {
    return this.todoService.all();
  }
  @Post('bd')
  create(@Body() body: TodoCreateDTO) {
    return this.todoService.addTodo(body);
  }
  @Put('bd/:id')
  updateTodo(@Param('id') id: string, @Body() updateTodo: TodoUpdateDto) {
    return this.todoService.updateTodo(+id, updateTodo);
  }
  @Get('bd')
  async paginer(@Query() params) {
    console.log(params);
    const { page, limit } = params;
    const skip = (page - 1) * limit;
    return await this.todoService.paginer(skip, limit);
  }

  @Get('bd/all')
  getall() {
    return this.todoService.getall();
  }
  @Get('bd/search')
  async getTodos3(@Query() conditions: SearchDTO) {
    console.log(conditions);
    return await this.todoService.getTodos2(conditions);
  }
  @Delete('bd/:id')
  deleteTodo(@Param('id') id: string) {
    return this.todoService.deleteToDo(+id);
  }
  @Patch('bd/:id')
  async restoreToDo(@Param('id') id: string) {
    return await this.todoService.restoreToDo(+id);
  }
  @Get('bd/count/:status')
  async countStatus(@Param('status') status) {
    return await this.todoService.countStatus(status);
  }

  @Post()
  createTodo(@Body() body: TodoCreateDTO): TodoModel {
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
  updateTodoById(@Param() params, @Body() updateTodo: TodoUpdateDto) {
    const id = params.id;
    return this.todoService.updateById(id, updateTodo);
  }
}
