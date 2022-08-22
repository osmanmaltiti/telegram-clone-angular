import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Socket } from 'ngx-socket-io';
import { ICurrentChat } from 'src/app/store/features/Chat/chat.types';
import { IGetUsers } from 'src/app/store/features/Users/user.types';
import { RootState } from 'src/app/store/store';
import { MutationService } from './services/mutation.service';
import { ChatQuery } from './services/query.service';

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.css'],
})
export class ChatAreaComponent implements OnInit {
  @Output('updateChat') updateChat: EventEmitter<any> = new EventEmitter();
  @Output('close') close: EventEmitter<any> = new EventEmitter();
  @Input('open') open: boolean = false;
  message: any = '';

  currentUser: IGetUsers = {
    id: '',
    fullname: '',
    number: 0,
    profile: '',
  };

  currentChat: ICurrentChat = {
    id: '',
    refereeId: '',
    combinedUserIds: '',
    __typename: '',
    data: [],
  };

  constructor(
    private socket: Socket,
    private store: Store<RootState>,
    private queryService: ChatQuery,
    private mutationService: MutationService
  ) {}

  ngOnInit(): void {
    this.store.select('ChatReducer').subscribe({
      next: (value) => {
        if (value.currentChat) this.currentChat = value.currentChat;
      },
    });

    this.store.select('UserReducer').subscribe({
      next: (value) => {
        if (value.referee) this.currentUser = value.referee;
      },
    });

    this.socket.fromEvent('update').subscribe({
      next: () => this.onGetChat(this.currentChat.combinedUserIds),
    });

    this.socket.fromEvent('broadcast_update').subscribe({
      next: () => this.onGetChat(this.currentChat.combinedUserIds),
    });
  }

  onSubmit() {
    const userdata = JSON.parse(String(localStorage.getItem('userdata')));

    const message = {
      chatId: this.currentChat.id,
      message: this.message,
      from: userdata.id,
      combinedUserIds: this.currentChat.combinedUserIds,
    };

    this.mutationService.mutate({ message }).subscribe({
      next: (value) => {},
    });
  }

  onClose() {
    this.close.emit();
  }

  onGetChat(id: any) {
    this.queryService.watch({ id }).valueChanges.subscribe({
      next: ({ data }) => {
        const { getChat } = data as unknown as {
          getChat: ICurrentChat;
        };
        this.currentChat = getChat;
      },
    });
  }
}
