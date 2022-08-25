import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Socket } from 'ngx-socket-io';
import { setCurrentChat } from 'src/app/store/features/Chat/chat.action';
import { ICurrentChat } from 'src/app/store/features/Chat/chat.types';
import { setReferee } from 'src/app/store/features/Users/user.action';
import { IGetUsers } from 'src/app/store/features/Users/user.types';
import { RootState } from 'src/app/store/store';
import { OpenChat } from './service/mutation.service';
import { QueryService } from './service/query.service';

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

  lastMessage: any = {
    message: '',
    file: '',
    from: '',
    time: 0,
  };

  url: string = 'http://localhost:5000/profile/';
  postUrl: string = 'http://localhost:5000/posts/';
  currentUser: string = '';

  constructor(
    private store: Store<RootState>,
    private OpenChat: OpenChat,
    private socket: Socket,
    private queryService: QueryService
  ) {}

  ngOnInit(): void {
    const id = String(localStorage.getItem('id'));
    this.currentUser = id;

    const combinedUserIds = [this.user.id, id].sort().join(' ');

    this.queryService.watch({ data: combinedUserIds }).valueChanges.subscribe({
      next: ({ data }) => {
        const { getLastMessage } = data as unknown as any;
        this.lastMessage = getLastMessage;
      },
      error: () => {
        return null;
      },
    });
  }

  onOpenChat() {
    const id = String(localStorage.getItem('id'));

    const data = {
      combinedUserIds: [this.user.id, id].sort().join(' '),
      refereeId: this.user.id,
    };

    this.store.dispatch(setReferee({ payload: this.user }));

    this.socket.emit('join-room', data.combinedUserIds);

    this.openChat.emit();

    this.OpenChat.mutate({ data }).subscribe({
      next: ({ data }) => {
        const { openChat } = data as unknown as { openChat: ICurrentChat };
        this.store.dispatch(setCurrentChat({ payload: openChat }));
      },
    });
  }
}
