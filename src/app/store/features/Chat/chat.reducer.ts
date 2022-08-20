import { createReducer, on } from '@ngrx/store';
import { HomeService, IAllChats } from 'src/app/home/services/home.service';
import { ICurrentChat, setChatData, setCurrentChat } from './chat.action';

interface IInitialState {
  currentChat: ICurrentChat | null;
  chatData: IAllChats | null;
}

const initialState: IInitialState = {
  currentChat: null,
  chatData: null,
};

export const chatReducer = createReducer(
  initialState,
  on(setCurrentChat, (state, { payload }) => {
    return { ...state, currentChat: payload };
  }),
  on(setChatData, (state, { payload }) => {
    const allChats = new HomeService().allChats;
    const chatData = allChats.find((item) => item.withId === payload);

    if (!chatData) return { ...state, chatData: null };
    return { ...state, chatData };
  })
);
