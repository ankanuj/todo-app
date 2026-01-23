import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '../../todo/todo.model';
import { FormsModule } from '@angular/forms';
import { TodoStatus } from '../../todo/todo.constants';

@Component({
  selector: 'app-display-todos',
  imports: [CommonModule, FormsModule],
  templateUrl: './display-todos.component.html',
  styleUrl: './display-todos.component.css'
})
export class DisplayTodosComponent {

  editTitle = '';
  editTodoId: number | null = null;
  public todoStatus = TodoStatus;

  @Input() todosList!: Todo[]; 
  @Input() todosCompleted!: Todo[]; 
  @Input() todosDeleted!: Todo[]; 

  @Output() completedStatus = new EventEmitter<Todo>();
  @Output() deletedStatus = new EventEmitter<Todo>();
  @Output() updateTodo = new EventEmitter<Todo>();

  editTodo(todo: Todo){
    this.editTodoId = todo.id;
    this.editTitle = todo.title;
  }
  saveTodo(todo: Todo){
    if(!this.editTitle.trim()) return;
    todo.title = this.editTitle
    this.updateTodo.emit(todo);
    this.cancel();
  }
  cancel(){
    this.editTitle = '';
    this.editTodoId = null;
  }
  statusUpdate(todo: Todo, status: TodoStatus){
    if(status === TodoStatus.completed){
      todo.status = TodoStatus.completed;
      this.completedStatus.emit(todo);
    } else if (status === TodoStatus.deleted){
      todo.status = TodoStatus.deleted;
      this.deletedStatus.emit(todo);
    } else return;
  }
}
