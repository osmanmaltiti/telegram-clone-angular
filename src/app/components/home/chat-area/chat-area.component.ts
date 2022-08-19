import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAllChats } from 'src/app/home/home.service';
import { setCurrentChat } from 'src/app/store/features/Chat/chat.action';
import store from 'src/app/store/store';

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.css'],
})
export class ChatAreaComponent implements OnInit {
  @Output('close') close: EventEmitter<any> = new EventEmitter();
  @Input('open') open: boolean = false;

  initChat = {
    profile: '',
    name: '',
    last_message: '',
    createdAt: Date.now(),
    id: '',
  };

  chatData: IAllChats = {
    chatWith: '',
    withId: '',
    withProfile: '',
    data: [],
  };

  constructor(private stores: Store<typeof store>) {}

  ngOnInit(): void {
    this.stores.select('chatReducer').subscribe({
      next: (value: any) => {
        const { chatData } = value as { chatData: IAllChats };
        if (chatData) {
          this.chatData = chatData;
        }
      },
    });
  }

  onClose() {
    this.stores.dispatch(setCurrentChat({ payload: this.initChat }));
    this.close.emit();
  }
}
