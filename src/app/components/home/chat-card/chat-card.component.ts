import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { setCurrentChat } from 'src/app/store/features/Chat/chat.action';
import { ICurrentChat } from 'src/app/store/features/Chat/chat.types';
import { setReferee } from 'src/app/store/features/Users/user.action';
import { IGetUsers } from 'src/app/store/features/Users/user.types';
import { RootState } from 'src/app/store/store';
import { OpenChat } from './service/mutation.service';

@Component({
  selector: 'app-chat-card',
  templateUrl: './chat-card.component.html',
  styleUrls: ['./chat-card.component.css'],
})
export class ChatCardComponent implements OnInit {
  @Output('open-chat') openChat: EventEmitter<any> = new EventEmitter();
  @Input('user') user: IGetUsers = {
    profile: '',
    fullname: '',
    id: '',
    number: 0,
  };
  storeChat: any;

  constructor(private store: Store<RootState>, private OpenChat: OpenChat) {}

  ngOnInit(): void {
    this.store.select('ChatReducer').subscribe({
      next: (value: any) => {
        const { currentChat } = value as { currentChat: ICurrentChat };
        if (currentChat) {
          this.storeChat = currentChat;
        }
      },
    });
  }

  onOpenChat() {
    const userdata = JSON.parse(String(localStorage.getItem('userdata')));

    const data = {
      combinedUserIds: [this.user.id, userdata.id].sort().join(' '),
      refereeId: this.user.id,
    };

    this.store.dispatch(setReferee({ payload: this.user }));

    this.OpenChat.mutate({ data }).subscribe({
      next: ({ loading, data }) => {
        const { openChat } = data as unknown as { openChat: ICurrentChat };
        this.store.dispatch(setCurrentChat({ payload: openChat }));
        this.openChat.emit();
      },
    });
  }
}
