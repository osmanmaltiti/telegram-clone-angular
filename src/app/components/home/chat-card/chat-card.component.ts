import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Socket } from 'ngx-socket-io';
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

  constructor(
    private store: Store<RootState>,
    private OpenChat: OpenChat,
    private socket: Socket
  ) {}

  ngOnInit(): void {}

  onOpenChat() {
    const userdata = JSON.parse(String(localStorage.getItem('userdata')));

    const data = {
      combinedUserIds: [this.user.id, userdata.id].sort().join(' '),
      refereeId: this.user.id,
    };

    this.store.dispatch(setReferee({ payload: this.user }));

    this.socket.emit('join-room', data.combinedUserIds);

    this.OpenChat.mutate({ data }).subscribe({
      next: ({ data }) => {
        const { openChat } = data as unknown as { openChat: ICurrentChat };
        this.store.dispatch(setCurrentChat({ payload: openChat }));
      },
    });

    this.openChat.emit();
  }
}
