import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HomeService {
  constructor() {}
  chatHead = [
    {
      profile: '',
      name: 'Maltiti Drowing',
      last_message: 'Adipisicing irure do non amet voluptate.',
      createdAt: Date.now(),
      id: '1',
    },
  ];
  allChats: Array<IAllChats> = [
    {
      chatWith: 'Maltiti Drowing',
      withId: '1',
      withProfile: '',
      data: [
        {
          date: Date.now(),
          chats: [
            {
              from: '1',
              time: Date.now(),
              message: 'Hello World',
            },
            {
              from: '2',
              time: Date.now(),
              message: 'Hello Dev',
            },
          ],
        },
        {
          date: Date.now(),
          chats: [
            {
              from: '2',
              time: Date.now(),
              message: 'Day Two',
            },
            {
              from: '1',
              time: Date.now(),
              message:
                'Yes It is, Top of the morning! Et qui aliquip ea commodo minim consectetur dolor anim. ',
            },
          ],
        },
      ],
    },
  ];
}

export interface IAllChats {
  chatWith: string;
  withId: string;
  withProfile: string;
  data: Array<{
    date: number;
    chats: Array<{
      from: string;
      time: number;
      message: string;
    }>;
  }>;
}
