import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { ICurrentChat } from 'src/app/store/features/Chat/chat.types';
import { IGetUsers } from 'src/app/store/features/Users/user.types';
import { RootState } from 'src/app/store/store';
import { MutationService } from './services/mutation.service';

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.css'],
})
export class ChatAreaComponent implements OnInit {
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
    private store: Store<RootState>,
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
  }

  onSubmit() {
    const userdata = JSON.parse(String(localStorage.getItem('userdata')));

    const message = {
      chatId: this.currentChat.id,
      message: this.message,
      from: userdata.id,
    };

    this.mutationService.mutate({ message }).subscribe({
      next: (value) => {
        console.log(value);
      },
    });
  }

  onClose() {
    this.close.emit();
  }
}
