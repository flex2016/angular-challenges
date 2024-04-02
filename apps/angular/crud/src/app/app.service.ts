import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { randText } from '@ngneat/falso';
import { Observable } from 'rxjs';
import { Todo } from './app.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos'; // Base URL for the API

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  updateTodo(todo: Todo): Observable<Todo> {
    const url = `${this.apiUrl}/${todo.id}`; // Construct the URL for the specific todo
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
    });

    return this.http.put<Todo>(
      url,
      JSON.stringify({
        id: todo.id,
        title: randText(), // Assuming randText() generates random text
        body: todo.body,
        userId: todo.userId,
      }),
      { headers },
    );
  }

  deleteTodo(id: number): Observable<Todo> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Todo>(url);
  }
}
