import { Injectable } from '@angular/core';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
    todos: Todo[] = [];
    completedTasks: Todo[] = [];
    deletedTasks: Todo[] = [];

    addTodo(todo: Todo) {
        this.todos.push(todo);
    }

    markCompleted(id: number){
        let compTask = this.todos.find(todo => todo.id === id);
        if(!compTask) return;
        this.todos = this.todos.filter(todo => todo.id !== id);
        if(compTask){
        this.completedTasks.push({...compTask});
        }
    }
    deleteTask(id: number){
        let deleted = this.todos.find(todo => todo.id === id);
        if(!deleted) return ; 
        if(deleted){
        this.deletedTasks.push({...deleted});
        }
        this.todos = this.todos.filter(todo => todo.id!==id);
    }

    getTodos(){
        return this.todos;
    }
    getCompletedTasks(){
        return this.completedTasks;
    }
    getDeletedTasks(){
        return this.deletedTasks;
    }
}