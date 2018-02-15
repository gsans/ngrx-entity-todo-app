import { Filter } from './currentFilter.model';
import { CurrentFilterActions, CurrentFilterActionTypes } from './currentFilter.actions';

export const initialState: string = 'SHOW_ALL';

export function reducer(state = initialState, action: CurrentFilterActions): string {
  switch (action.type) {
    case CurrentFilterActionTypes.SetCurrentFilter:
      return action.payload.filter
    default:
      return state;
  }
}