import { Component,} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';
import { TodoStatus } from './todo.constants';
import { DisplayTodosComponent } from '../components/display-todos/display-todos.component';

@Component({
  selector: 'app-todo',
  imports: [CommonModule, FormsModule, DisplayTodosComponent],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {
  newTodoTitle = '';
  todosList: Todo[] = [];
  todosCompleted: Todo[] = [];
  todosDeleted: Todo[] = [];

  constructor(public todoService: TodoService){};

  ngOnInit() {
    this.refreshTodos();
  }
  refreshTodos(){
    this.todoService.fetchTasks().subscribe( todos => {
      this.todosList = todos.filter(todo => todo.status === TodoStatus.todo);
      this.todosCompleted = todos.filter(todo => todo.status === TodoStatus.completed);
      this.todosDeleted = todos.filter(todo => todo.status === TodoStatus.deleted);
    })
  }

  createTask(){
    if(!this.newTodoTitle.trim()) return;

    const todo: Todo ={
      id: Date.now(),
      title: this.newTodoTitle,
      status: TodoStatus.todo
    };

    this.todoService.addTodo(todo).subscribe(()=>{
      this.refreshTodos();
      this.newTodoTitle = '';
    });
  }
  completeTask(todo: Todo){
    this.todoService.updateTodo(todo.id, {status: TodoStatus.completed}).subscribe(() =>{
      this.refreshTodos();
    });
  }
  remove(todo: Todo){
    this.todoService.updateTodo(todo.id, {status: TodoStatus.deleted}).subscribe(()=> {
      this.refreshTodos();
    });
  }
  updateTodo(todo: Todo,){
      this.todoService.updateTodo(todo.id, {title: todo.title}).subscribe(() => {
      this.refreshTodos();
    });
  }

}
