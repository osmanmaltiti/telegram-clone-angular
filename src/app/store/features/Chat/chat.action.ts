import { createAction, props } from '@ngrx/store';
import { ICurrentChat } from './chat.types';

export const setCurrentChat = createAction(
  'SET_CURRENT_CHAT',
  props<{ payload: ICurrentChat }>()
);

export const setChatData = createAction(
  'SET_CHAT_DATA',
  props<{ payload: string }>()
);
