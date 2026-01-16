import { Component,} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Todo } from './todo.model';

@Component({
  selector: 'app-todo',
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {
  newTodoTitle = '';
  todos: Todo[] = [];
  deletedTodos: Todo[] = [];
  completedTask: Todo[] = [];
  editTitle = '';
  editTodoId: number | null = null;

  createTask(){
    if(!this.newTodoTitle.trim()) return;

    const newTodo: Todo =
      {
        id: Date.now(),
        title: this.newTodoTitle,
        // completed: false,
      };
    this.todos.push(newTodo);
    this.newTodoTitle = '';
  }

  removeTask(id: number){
    let deleted = this.todos.find(todo => todo.id === id);
    if(!deleted) return ; 
    if(deleted){
      this.deletedTodos.push({...deleted});
    }
    this.todos = this.todos.filter(todo => todo.id!==id)
  }
  markCompleted(id: number){
    let compTask = this.todos.find(todo => todo.id === id);
    if(!compTask) return;

    this.todos = this.todos.filter(todo => todo.id !== id);
    console.log(compTask);
    if(compTask){
      this.completedTask.push({...compTask});
    }
  }

  editTodo(todo: Todo){
    console.log(todo);
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
