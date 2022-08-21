export interface IGetUsers {
  id: string;
  fullname: string;
  number: number;
  profile: string;
  __typename?: string;
}

export interface IInitialState {
  allUsers: Array<IGetUsers>;
  referee: IGetUsers | null;
}
