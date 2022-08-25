export interface ICurrentChat {
  id: string;
  combinedUserIds: string;
  refereeId?: string;
  __typename: string;
  data: Array<IData>;
}

export interface IData {
  id: string;
  chatId: string;
  date: string;
  messages: Array<IMessages>;
}

export interface IMessages {
  id: string;
  chatDataId: string;
  from: string;
  time: string;
  file: string;
  message: string;
}
