import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { randText } from '@ngneat/falso';
import { Todo } from './app.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  #todos = signal<Todo[]>([]);
  todos = computed(this.#todos);

  private apiUrl = 'https://jsonplaceholder.typicode.com/todos'; // Base URL for the API

  constructor(private http: HttpClient) {}

  public getTodos(): void {
    this.http.get<Todo[]>(this.apiUrl).subscribe((todos) => {
      this.#todos.set(todos);
    });
  }

  public updateTodo(todo: Todo): void {
    const url = `${this.apiUrl}/${todo.id}`;
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
    });

    this.http
      .put<Todo>(
        url,
        JSON.stringify({
          id: todo.id,
          title: randText(),
          body: todo.body,
          userId: todo.userId,
        }),
        { headers },
      )
      .subscribe((todoUpdated: Todo) => {
        this.#todos.update((todos) =>
          todos.map((todo) =>
            todo.id === todoUpdated.id ? todoUpdated : todo,
          ),
        );
      });
  }

  public deleteTodo(id: number): void {
    const url = `${this.apiUrl}/${id}`;
    this.http
      .delete<Todo>(url)
      .subscribe((_) =>
        this.#todos.update((todos) => todos.filter((todo) => todo.id !== id)),
      );
  }
}
