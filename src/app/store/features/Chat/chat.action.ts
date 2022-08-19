import { createAction, props } from '@ngrx/store';

export const setCurrentChat = createAction(
  'SET_CURRENT_CHAT',
  props<{ payload: ICurrentChat }>()
);

export const setChatData = createAction(
  'SET_CHAT_DATA',
  props<{ payload: string }>()
);

export interface ICurrentChat {
  profile: string;
  name: string;
  last_message: string;
  createdAt: number;
  id: string;
}
