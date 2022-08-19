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
    {
      profile: '',
      name: 'Maltiti Climbing',
      last_message:
        'Esse mollit non duis laboris eu voluptate sint culpa consequat fugiat non incididunt.',
      createdAt: Date.now(),
      id: '2',
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
      ],
    },
    {
      chatWith: 'Maltiti Climbing',
      withId: '2',
      withProfile: '',
      data: [
        {
          date: Date.now(),
          chats: [
            {
              from: '1',
              time: Date.now(),
              message: 'Hello Second World',
            },
            {
              from: '2',
              time: Date.now(),
              message: 'Hello Second Dev',
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
