import { InjectionToken } from '@angular/core';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { Load } from '../models';
import { initialLoad } from './reducers';
import loadReducer from './reducers/load.reducer';

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    // console.log('state', state);
    // console.log('action', action);
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [debug];

export const initialState: IAppState = {
  load: initialLoad
};

export interface IAppState {
  load: Load;
}

export const reducers: ActionReducerMap<IAppState> = {
  load: loadReducer
};

export const REDUCER_TOKEN = new InjectionToken<ActionReducerMap<IAppState>>(
  'root reducer'
);
