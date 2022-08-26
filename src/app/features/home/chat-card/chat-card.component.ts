import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
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
export class ChatCardComponent implements OnInit, OnChanges {
  @Output('open-chat') openChat: EventEmitter<any> = new EventEmitter();
  @Input('lastMessage') updateLastMessage: any;

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

  currentChat: ICurrentChat = {
    id: '',
    refereeId: '',
    combinedUserIds: '',
    __typename: '',
    data: [],
  };

  postUrl: string = 'http://localhost:5000/posts/';
  url: string = 'http://localhost:5000/profile/';
  currentUser: string = '';

  constructor(
    private queryService: QueryService,
    private store: Store<RootState>,
    private OpenChat: OpenChat,
    private socket: Socket
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['updateLastMessage'].currentValue) this.onLastMessage();
  }

  ngOnInit(): void {
    this.onLastMessage();

    this.store.select('ChatReducer').subscribe({
      next: (value) => {
        if (value.currentChat) this.currentChat = value.currentChat;
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

  onLastMessage() {
    const id = String(localStorage.getItem('id'));
    this.currentUser = id;

    const combinedUserIds = [this.user.id, id].sort().join(' ');

    this.queryService
      .watch({ data: combinedUserIds }, { fetchPolicy: 'network-only' })
      .valueChanges.subscribe({
        next: ({ data }) => {
          const { getLastMessage } = data as unknown as any;
          this.lastMessage = getLastMessage;
          console.log(getLastMessage);
        },
        error: () => {
          return null;
        },
      });

    this.updateLastMessage = false;
  }
}
