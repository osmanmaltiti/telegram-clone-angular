import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SiderbarService {
  button = buttonArray;

  constructor() {}
}

export interface IIcons {
  title: string;
  class: string;
  icon: {
    dataIcon: string;
    dataFlip: string;
  };
}

const buttonArray = [
  {
    title: 'New Group',
    class: 'w-[1.7rem] h-[1.7rem] mx-[.1rem] bg-[#56B3F5] rounded-md grid',
    icon: {
      dataIcon: 'bi:people-fill',
      dataFlip: 'horizontal',
    },
  },
  {
    title: 'New Channel',
    class: 'w-[1.7rem] h-[1.7rem] mx-[.1rem] bg-[#ED9F20] rounded-md grid',
    icon: {
      dataIcon: 'bi:megaphone-fill',
      dataFlip: '',
    },
  },
  {
    title: 'Contacts',
    class: 'w-[1.7rem] h-[1.7rem] mx-[.1rem] bg-[#F06964] rounded-md grid',
    icon: {
      dataIcon: 'bi:person-fill',
      dataFlip: '',
    },
  },
  {
    title: 'Calls',
    class: 'w-[1.7rem] h-[1.7rem] mx-[.1rem] bg-[#6DC534] rounded-md grid',
    icon: {
      dataIcon: 'carbon:phone-filled',
      dataFlip: '',
    },
  },
  {
    title: 'Saved Messages',
    class: 'w-[1.7rem] h-[1.7rem] mx-[.1rem] bg-[#56B3F5] rounded-md grid',
    icon: {
      dataIcon: 'bi:bookmark-fill',
      dataFlip: 'horizontal',
    },
  },
  {
    title: 'Settings',
    class: 'w-[1.7rem] h-[1.7rem] mx-[.1rem] bg-[#B580E2] rounded-md grid',
    icon: {
      dataIcon: 'ci:settings-filled',
      dataFlip: 'horizontal',
    },
  },
  {
    title: 'Night Mode',
    id: 'newgroup',
    class: 'w-[1.7rem] h-[1.7rem] mx-[.1rem] bg-[#7595FF] rounded-md grid',
    icon: {
      dataIcon: 'bxs:moon',
      dataFlip: '',
    },
  },
];
