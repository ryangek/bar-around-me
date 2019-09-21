import { createAction, props } from '@ngrx/store';
import { Load } from '../../models';

export const loading = createAction('[Load Component] Loading');
export const loaded = createAction('[Load Component] Loaded');
export const loadingTimer = createAction(
  '[Load Component] set load with timer'
);
