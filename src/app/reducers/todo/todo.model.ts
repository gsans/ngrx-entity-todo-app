import { EntityState } from '@ngrx/entity';

export interface Todo {
  id: number;
  completed: boolean;
  text: string;  
}

export interface Todos {
  todos: EntityState<Todo>;
}