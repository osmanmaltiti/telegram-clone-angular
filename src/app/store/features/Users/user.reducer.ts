import { createReducer, on } from '@ngrx/store';
import { fetchUsers, setReferee } from './user.action';
import { IInitialState } from './user.types';

export const initialState: IInitialState = {
  allUsers: [],
  referee: null,
};

export const UserReducer = createReducer(
  initialState,
  on(fetchUsers, (state, { payload }) => {
    return { ...state, allUsers: payload };
  }),
  on(setReferee, (state, { payload }) => {
    return { ...state, referee: payload };
  })
);
