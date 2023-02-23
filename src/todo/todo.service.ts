import { Inject, Injectable, NotFoundException} from '@nestjs/common';
import { TodoCreate } from './DTO/todo-create.dto';
import { TodoModel } from './todo.model';
import { TodoUpdate } from './DTO/todo-update.dto';

@Injectable()
export class TodoService {
  @Inject('UUID') uuid: () => string;
  private todos: TodoModel[] = [];
  create(body_todo: TodoCreate) {
    const todo = new TodoModel(
      this.uuid(),
      body_todo.name,
      body_todo.description,
      TodoModel.strToEnum(body_todo.status),
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
  updateById(id: string, updateTodo: TodoUpdate) {
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
