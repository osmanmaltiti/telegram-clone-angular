import { createAction, props } from '@ngrx/store';
import { IGetUsers } from './user.types';

export const fetchUsers = createAction(
  'GET_USERS',
  props<{ payload: Array<IGetUsers> }>()
);

export const setReferee = createAction(
  'SET_REFREE',
  props<{ payload: IGetUsers }>()
);
