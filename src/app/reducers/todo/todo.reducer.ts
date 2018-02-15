import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Todo } from './todo.model';
import { TodoActions, TodoActionTypes } from './todo.actions';

export interface State extends EntityState<Todo> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export function reducer(
  state = initialState,
  action: TodoActions
): State {
  switch (action.type) {
    case TodoActionTypes.AddTodo: {
      return adapter.addOne(action.payload.todo, state);
    }

    //case TodoActionTypes.UpsertTodo: {
    //  return adapter.upsertOne(action.payload.todo, state);
    //}

    case TodoActionTypes.AddTodos: {
      return adapter.addMany(action.payload.todos, state);
    }

    //case TodoActionTypes.UpsertTodos: {
    // return adapter.upsertMany(action.payload.todos, state);
    //}

    case TodoActionTypes.UpdateTodo: {
      return adapter.updateOne(action.payload.todo, state);
    }

    case TodoActionTypes.UpdateTodos: {
      return adapter.updateMany(action.payload.todos, state);
    }

    case TodoActionTypes.DeleteTodo: {
      return adapter.removeOne(action.payload.id, state);
    }

    case TodoActionTypes.DeleteTodos: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case TodoActionTypes.LoadTodos: {
      return adapter.addAll(action.payload.todos, state);
    }

    case TodoActionTypes.ClearTodos: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
