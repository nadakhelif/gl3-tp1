import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TodoCreateDTO } from './DTO/todo-create.dto';
import { TodoModel } from './todo.model';
import { TodoUpdateDto } from './DTO/todo-update.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from './entities/todo.entity';
import { Like, Repository } from 'typeorm';
import { TodoStatusEnum } from './entities/todostatusEnum';
import { SearchDTO } from './DTO/search.dto';

@Injectable()
export class TodoService {
  constructor(
    @Inject('UUID') private readonly uuid: () => string,
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}
  private todos: TodoModel[] = [];
  async addTodo(createTodo: TodoCreateDTO) {
    const todo = this.todoRepository.create({ ...createTodo });
    todo.status = TodoStatusEnum.actif;
    return await this.todoRepository.save(todo);
  }
  async updateTodo(id: number, updateTodo: TodoUpdateDto) {
    const todo = await this.todoRepository.findOne({ where: { id: id } });
    if (!todo) {
      throw new NotFoundException('todo not found');
    } else {
      await this.todoRepository.update({ id }, updateTodo);
      return todo;
    }
  }
  async deleteToDo(id: number) {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException('todo not here ');
    }
    await this.todoRepository.softDelete(id);
    return { message: 'deleted todo success' };
  }
  async restoreToDo(id: number) {
    return await this.todoRepository.restore(id);
  }
  async countStatus(status: any) {
    return await this.todoRepository.count({ where: { status: status } });
  }
  async getTodoById(id: number) {
    const todo = await this.todoRepository.find({ where: { id: id } });
    if (!todo) {
      throw new NotFoundException();
    }
    return todo;
  }
  async getall() {
    return await this.todoRepository.find();
  }
  async paginer(skip: number, limit: number) {
    const take = limit;
    return await this.todoRepository.find({ skip, take });
  }
  async getTodos2(conditions?: SearchDTO) {
    const { status, critere } = conditions;
    if (status || critere) {
      const nameQuery = Like(`%${critere}%`);
      const descriptionQuery = Like(`%${critere}%`);
      const statusQuery = status;
      return await this.todoRepository.find({
        where: [
          { name: nameQuery, status: statusQuery },
          { description: descriptionQuery, status: statusQuery },
          { status: statusQuery },
        ],
      });
    } else {
      return await this.todoRepository.find();
    }
  }
  //partie lekdima

  create(body_todo: TodoCreateDTO) {
    const todo = new TodoModel(
      this.uuid(),
      body_todo.name,
      body_todo.description,
    );
    this.todos.push(todo);
    return todo;
  }

  getById(id: string) {
    const todo = this.todos.find((element) => element.id === id);
    if (todo) {
      return todo;
    } else {
      throw new NotFoundException();
    }
  }
  deleteById(id: string) {
    const todo = this.todos.find((element) => element.id === id);
    if (todo) {
      const todoId = this.todos.indexOf(todo);
      this.todos.splice(todoId, 1);
      return this.todos;
    } else {
      throw new NotFoundException();
    }
  }
  all() {
    return this.todos;
  }
  updateById(id: string, updateTodo: TodoUpdateDto) {
    const todo = this.todos.find((element) => element.id === id);
    if (todo) {
      const todoId = this.todos.indexOf(todo);
      if (updateTodo.name !== undefined)
        this.todos[todoId].name = updateTodo.name;
      if (updateTodo.description !== undefined)
        this.todos[todoId].description = updateTodo.description;
      if (updateTodo.status !== undefined)
        this.todos[todoId].status = TodoModel.strToEnum(updateTodo.status);
      return this.todos;
    } else {
      throw new NotFoundException();
    }
  }
}
