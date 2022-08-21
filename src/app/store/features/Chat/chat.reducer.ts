import { createReducer, on } from '@ngrx/store';
import { setChatData, setCurrentChat } from './chat.action';
import { ICurrentChat } from './chat.types';

interface IInitialState {
  currentChat: ICurrentChat | null;
}

const initialState: IInitialState = {
  currentChat: null,
};

export const ChatReducer = createReducer(
  initialState,
  on(setCurrentChat, (state, { payload }) => {
    return { ...state, currentChat: payload };
  }),
  on(setChatData, (state, { payload }) => {
    return state;
  })
);
