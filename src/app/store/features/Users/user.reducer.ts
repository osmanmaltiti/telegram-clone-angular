import { createReducer, on } from '@ngrx/store';
import { fetchUsers, setReferee, setUser } from './user.action';
import { IInitialState } from './user.types';

export const initialState: IInitialState = {
  allUsers: [],
  referee: null,
  user: null,
};

export const UserReducer = createReducer(
  initialState,
  on(setUser, (state, { payload }) => {
    return { ...state, user: payload };
  }),
  on(fetchUsers, (state, { payload }) => {
    return { ...state, allUsers: payload };
  }),
  on(setReferee, (state, { payload }) => {
    return { ...state, referee: payload };
  })
);
