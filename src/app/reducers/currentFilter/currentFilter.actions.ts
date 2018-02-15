import { Action } from '@ngrx/store';

export enum CurrentFilterActionTypes {
  SetCurrentFilter = '[Filter] Set current filter'
}

export class SetCurrentFilter implements Action {
  readonly type = CurrentFilterActionTypes.SetCurrentFilter;

  constructor(public payload: { filter: string }) {}
}

export type CurrentFilterActions = SetCurrentFilter;