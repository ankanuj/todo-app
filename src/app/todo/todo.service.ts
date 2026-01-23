import { Injectable, inject } from '@angular/core';
import { Todo } from './todo.model';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { TodoStatus } from './todo.constants';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
    todos: Todo[] = [];
    completedTasks: Todo[] = [];
    deletedTasks: Todo[] = [];

    private API ='http://localhost:3000/todos';
    private http = inject(HttpClient);

    fetchTasks(): Observable<Todo[]>{
        return this.http.get<Todo[]>(this.API).pipe(
            map(todos => 
                todos.map(todo => ({
                    ...todo,
                    status: todo.status ?? TodoStatus.todo
                }))
            )
        );
    }

    addTodo(todo: Todo): Observable<Todo[]> {        
        console.log('Adding todo:', todo);  
        return this.http.post<Todo[]>(this.API, todo);
    }
    updateTodo(id:number, todo: Partial<Todo>): Observable<Todo[]>{
        return this.http.patch<Todo[]>(`${this.API}/${id}`, todo);
    }
}