import { Component,} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo',
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {
  newTodoTitle = '';
  editTitle = '';
  editTodoId: number | null = null;

  constructor(public todoService: TodoService){};
  
  createTask(){
    if(!this.newTodoTitle.trim()) return;

    const newTodo: Todo =
      {
        id: Date.now(),
        title: this.newTodoTitle,
        // completed: false,
      };
    this.todoService.addTodo(newTodo);
    this.newTodoTitle = '';
  }

  completeTask(id: number){
    this.todoService.markCompleted(id);
  }
  
  remove(id: number){
    this.todoService.deleteTask(id);
  }

  editTodo(todo: Todo){
    this.editTodoId = todo.id;
    this.editTitle = todo.title;
  }

  saveTodo(todo: Todo){
    if(!this.editTitle.trim()) return;

    todo.title = this.editTitle;
    this.cancel();
  }
  cancel(){
    this.editTitle = '';
    this.editTodoId = null;
  }
}
