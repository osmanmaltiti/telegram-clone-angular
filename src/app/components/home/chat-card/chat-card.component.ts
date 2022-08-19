import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  ICurrentChat,
  setChatData,
} from 'src/app/store/features/Chat/chat.action';
import store from 'src/app/store/store';

@Component({
  selector: 'app-chat-card',
  templateUrl: './chat-card.component.html',
  styleUrls: ['./chat-card.component.css'],
})
export class ChatCardComponent implements OnInit {
  @Output('open-chat') openChat: EventEmitter<any> = new EventEmitter();
  @Input('chat') chat: ICurrentChat = {
    profile: '',
    name: '',
    last_message: '',
    createdAt: Date.now(),
    id: '',
  };
  focus: boolean = false;
  storeChat: any;

  constructor(private stores: Store<typeof store>) {}

  ngOnInit(): void {
    this.stores.select('chatReducer').subscribe({
      next: (value: any) => {
        const { currentChat } = value as { currentChat: ICurrentChat };
        if (currentChat) {
          if (currentChat.id !== this.chat.id) return;
          this.storeChat = currentChat;
          this.focus = !this.focus;
        }
      },
    });
  }

  onOpenChat() {
    this.stores.dispatch(setChatData({ payload: this.chat.id }));
    this.openChat.emit();
  }
}
