import { combineReducers } from '@ngrx/store';
import { ChatReducer } from './features/Chat/chat.reducer';
import { UserReducer } from './features/Users/user.reducer';

const rootReducer = combineReducers({
  ChatReducer,
  UserReducer,
});

const Store = {
  ChatReducer,
  UserReducer,
};

export type RootState = ReturnType<typeof rootReducer>;
export default Store;
