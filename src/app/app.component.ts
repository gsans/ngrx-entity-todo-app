import { Component, NgModule, OnDestroy, ViewChildren } from '@angular/core'

// NGRX - store, reducer and selector imports
import { Store } from '@ngrx/store'

import * as todoActions from './reducers/todo/todo.actions'
import * as filterActions from './reducers/currentFilter/currentFilter.actions'
import { Observable } from 'rxjs/Observable'
import { State, select } from '@ngrx/store'
import { Update } from '@ngrx/entity'

import {
  TodosState,
  reducers as rootReducer,
  getTodos,
  getCurrentFilter,
} from './reducers'
import 'rxjs/add/operator/let'
import { map } from 'rxjs/operators'
import { combineReducers, ActionReducer } from '@ngrx/store'
import { Todo } from './reducers/todo/todo.model'

@Component({
  selector: 'app-root',
  template: `
    <div>
      <mat-card class="card" [ngClass]="{'flipped': flipped}">
      <mat-card-header style="flex-direction: column;">
        <div class="box">
          <div class="title" (click)="flipped=!flipped">Todo App powered by @ngrx/entity</div>
        </div>
      </mat-card-header>
      <mat-card-content>
      <div class="container">
        <mat-form-field class="field" (keydown.enter)="addTodo(todo1)">
          <input #todo1  matInput placeholder="Add a new todo" class="todo-input">
        </mat-form-field>
      </div>
      <div *ngIf="(todos|async)?.length>0">
        <mat-tab-group mat-stretch-tabs="yes" (selectedTabChange)="setFilter($event)">
          <mat-tab label="All"></mat-tab>
          <mat-tab label="Active"></mat-tab>
          <mat-tab label="Completed"></mat-tab>
        </mat-tab-group>
      </div>
      <mat-spinner *ngIf="loading"></mat-spinner>
      <div class="message box" *ngIf="(todos|async)?.length===0">Ups! There are no todos yet...</div>
      <mat-list class="list">
        <mat-list-item *ngFor="let todo of todos | async | visibleTodos:currentFilter" class="container1" (click)="onTodoClick(todo.id, todo.completed)">
          <mat-checkbox class="checkbox" [checked]="todo.completed"></mat-checkbox>
          <div class="todo-text">{{todo.text}} <div class="delete"><a href="#" (click)="removeTodo(todo.id)"><mat-icon>delete</mat-icon></a></div></div>
        </mat-list-item> 
      </mat-list>
      </mat-card-content>
      <mat-card-footer class="footer1" md>
        <div class="subtitle">Made in Amsterdam by &nbsp;
        <div title="Gerard Sans"><a href="https://twitter.com/gerardsans" target="_blank"><img src="http://image.ibb.co/f3Mzt7/3q_UVl6_M_400x400.jpg" alt="" width="24" height="24" class="profile"></a></div>
        </div>
      </mat-card-footer>
    </mat-card>
  `,
})
export class AppComponent {
  currentFilter: string
  todos

  constructor(private _store: Store<TodosState>) {
    this.todos = _store.let(getTodos)
    _store.let(getCurrentFilter).subscribe((filter: string) => {
      this.currentFilter = filter
    })
  }

  private addTodo(input) {
    if (input.value.length === 0) return
    const todo: Todo = {
      id: null,
      text: input.value,
      completed: false,
    }
    this._store.dispatch(new todoActions.AddTodo({ todo }))
    input.value = ''
  }

  private onTodoClick(id, completed) {
    const todo = {
      id,
      changes: {
        completed: !completed,
      },
    }
    this._store.dispatch(new todoActions.UpdateTodo({ todo }))
  }

  private removeTodo(id) {
    this._store.dispatch(new todoActions.DeleteTodo({ id }))
  }

  private applyFilter(filter) {
    this._store.dispatch(new filterActions.SetCurrentFilter({ filter }))
  }

  private setFilter(event) {
    let filter = ['SHOW_ALL', 'SHOW_ACTIVE', 'SHOW_COMPLETED'][event.index]
    this.applyFilter(filter)
  }
}
