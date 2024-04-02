import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Todo } from './app.model';
import { TodoService } from './app.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-root',
  template: `
    <div *ngFor="let todo of todos">
      {{ todo.title }}
      <button (click)="update(todo)">Update</button>
      <button (click)="deleteTodo(todo.id)">Delete</button>
    </div>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  todos!: Todo[];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodos().subscribe(
      (todos) => {
        this.todos = todos; // Assign the retrieved todos to the component's todos array
      },
      (error) => {
        console.error('Error fetching todos:', error);
      },
    );
  }

  // Method to update a todo
  update(todo: Todo): void {
    this.todoService.updateTodo(todo).subscribe(
      (updatedTodo) => {
        const index = this.todos.findIndex((t) => t.id === updatedTodo.id);
        if (index !== -1) {
          // Update the todo in the todos array
          this.todos[index] = updatedTodo;
        }
      },
      (error) => {
        console.error('Error updating todo:', error);
      },
    );
  }

  // Method to delete a todo
  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id).subscribe(
      () => {
        // Filter out the deleted todo from the todos array
        this.todos = this.todos.filter((todo) => todo.id !== id);
      },
      (error) => {
        console.error('Error deleting todo:', error);
      },
    );
  }
}
