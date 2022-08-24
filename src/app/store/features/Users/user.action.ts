import { createAction, props } from '@ngrx/store';
import { ICreateUser, IGetUsers } from './user.types';

export const setUser = createAction(
  'SET_USER',
  props<{ payload: ICreateUser | null }>()
);

export const fetchUsers = createAction(
  'GET_USERS',
  props<{ payload: Array<IGetUsers> }>()
);

export const setReferee = createAction(
  'SET_REFREE',
  props<{ payload: IGetUsers | null }>()
);
