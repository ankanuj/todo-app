import { Injectable } from '@angular/core';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
    todos: Todo[] = [];
    completedTasks: Todo[] = [];
    deletedTasks: Todo[] = [];

    addTodo(todo:string) {
        const newTodo: Todo = {
            id: Date.now(),
            title: todo,
            // completed: false,
        }
        this.todos.push(newTodo);
        this.saveToLocalStorage();
    }
    saveToLocalStorage(){
        localStorage.setItem('todos', JSON.stringify(this.todos))
    }
    saveCompletedToLocalStorage(){
        localStorage.setItem('completedTasks', JSON.stringify(this.completedTasks)); 
    }
    saveDeletedToLocalStorage(){
        localStorage.setItem('deletedTasks', JSON.stringify(this.deletedTasks));
    }    
    loadTodosFromLocalStroage(){
        const data = localStorage.getItem('todos')
        if(data){
            this.todos = JSON.parse(data);
        }
    }
    loadCompletedFromLocalStorage(){
        const data = localStorage.getItem('completedTasks');
        if(data){
            this.completedTasks = JSON.parse(data);
        }
    }
    loadDeletedFromLocalStorage(){
        const data = localStorage.getItem('deletedTasks');
        if(data){
            this.deletedTasks = JSON.parse(data);
        }
    }
    markCompleted(id: number){
        let compTask = this.todos.find(todo => todo.id === id);
        if(!compTask) return;
        this.todos = this.todos.filter(todo => todo.id !== id);
        if(compTask){
        this.completedTasks.push({...compTask});
        this.saveToLocalStorage();
        this.saveCompletedToLocalStorage();
        }
    }
    deleteTask(id: number){
        let deleted = this.todos.find(todo => todo.id === id);
        if(!deleted) return ; 
        if(deleted){
        this.deletedTasks.push({...deleted});
        }
        this.todos = this.todos.filter(todo => todo.id!==id);
        this.saveToLocalStorage();
        this.saveDeletedToLocalStorage();
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