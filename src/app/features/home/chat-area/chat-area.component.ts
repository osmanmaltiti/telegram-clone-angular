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
import { ICurrentChat } from 'src/app/store/features/Chat/chat.types';
import { setReferee } from 'src/app/store/features/Users/user.action';
import { IGetUsers } from 'src/app/store/features/Users/user.types';
import { RootState } from 'src/app/store/store';
import { MutationService } from './services/mutation.service';

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.css'],
})
export class ChatAreaComponent implements OnInit, OnChanges {
  @Output('updateChat') updateChat: EventEmitter<any> = new EventEmitter();
  @Output('close') close: EventEmitter<any> = new EventEmitter();
  @Input('open') open: boolean = false;

  file: any;
  message: any = '';
  openFileUploadDialog: boolean = false;
  url: string = 'http://localhost:5000/profile/';

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
    private mutationService: MutationService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {}

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
      next: (value: any) => (this.currentChat = value),
    });

    this.socket.fromEvent('broadcast_update').subscribe({
      next: (value: any) => (this.currentChat = value),
    });
  }

  onSubmit() {
    const id = String(localStorage.getItem('id'));

    const message = {
      file: '',
      from: id,
      message: this.message,
      chatId: this.currentChat.id,
      combinedUserIds: this.currentChat.combinedUserIds,
    };

    this.mutationService.mutate({ message }).subscribe({
      next: () => {},
    });

    this.message = '';
  }

  onClose() {
    this.store.dispatch(setReferee({ payload: null }));
    this.close.emit();
  }

  onChange(event: Event) {
    const file = (<HTMLInputElement>event.target).files;

    if (file) this.file = file[0];
    if (file) this.openFileUploadDialog = !this.openFileUploadDialog;
  }

  onCancelUpload() {
    this.openFileUploadDialog = false;
    this.file = '';
  }
}
