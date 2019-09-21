import { createReducer, on } from '@ngrx/store';
import { loading, loaded, loadingTimer } from '../actions/load.actions';
import { Load } from '../../models';

export const initialLoad: Load = {
  loading: false,
  timer: false
};

export default createReducer(
  initialLoad,
  on(loading, state =>
    Object.assign({}, state, { loading: true, timer: false })
  ),
  on(loaded, state =>
    Object.assign({}, state, { loading: false, timer: false })
  ),
  on(loadingTimer, state =>
    Object.assign({}, state, { loading: true, timer: true })
  )
);
