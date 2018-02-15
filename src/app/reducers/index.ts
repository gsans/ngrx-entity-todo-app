import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { Todos } from './todo/todo.model';
import * as todos from './todo/todo.reducer';
import { Filter } from './currentFilter/currentFilter.model';
import { reducer as currentFilter } from './currentFilter/currentFilter.reducer';
import { select } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as todoEntity from './todo/todo.reducer';

export interface TodosState extends Todos, Filter { }

export const reducers: ActionReducerMap<TodosState> = {
  todos: todos.reducer,
  currentFilter: currentFilter
};

export const metaReducers: MetaReducer<TodosState>[] = !environment.production ? [] : [];


// before v5
// export const getTodos = state$ => state$.select(s => s.todos); 
// export const getCurrentFilter = state$ => state$.select('currentFilter'); 

export const getTodos = state$ => state$.pipe(
  select('todos'), 
  map(todoEntity.selectAll) 
);
export const getCurrentFilter = state$ => state$.pipe(
  select('currentFilter')
);